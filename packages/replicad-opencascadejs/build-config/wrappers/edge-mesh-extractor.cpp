// Edge-polyline extractor used by Replicad's wireframe rendering path.
//
// It emits packed line soup for bulk upload/read:
//   lines      : float[] (6 floats per segment: x1,y1,z1, x2,y2,z2)
//   edgeGroups : int32[] ({lineStart, lineVertexCount, edgeHash} per edge)
//
// Face polygons are preferred so wireframe boundaries exactly match the face
// triangulation. Free edges fall back to tangential-deflection tessellation.
// Exact IsSame-compatible shape-map equality deduplicates edges shared by
// adjacent faces; bounded public hashes are labels, never dedupe keys.

#include <BRepAdaptor_Curve.hxx>
#include <GCPnts_TangentialDeflection.hxx>
#include <NCollection_Array1.hxx>
#include <NCollection_Map.hxx>
#include <cstdlib>

class ReplicadEdgeMeshData;
inline ReplicadEdgeMeshData ReplicadExtractEdgeMesh(
  const TopoDS_Shape& shape,
  double tolerance,
  double angularTolerance);

class ReplicadEdgeMeshData {
public:
  ReplicadEdgeMeshData()
    : linesPtr_(nullptr), edgeGroupsPtr_(nullptr),
      linesSize_(0), edgeGroupsSize_(0) {}

  ~ReplicadEdgeMeshData() {
    std::free(linesPtr_);
    std::free(edgeGroupsPtr_);
  }

  ReplicadEdgeMeshData(const ReplicadEdgeMeshData& other)
    : linesPtr_(other.linesPtr_), edgeGroupsPtr_(other.edgeGroupsPtr_),
      linesSize_(other.linesSize_), edgeGroupsSize_(other.edgeGroupsSize_) {
    auto& moved = const_cast<ReplicadEdgeMeshData&>(other);
    moved.linesPtr_ = nullptr;
    moved.edgeGroupsPtr_ = nullptr;
  }

  int getLinesPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(linesPtr_)); }
  int getLinesSize() const { return linesSize_; }
  int getEdgeGroupsPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(edgeGroupsPtr_)); }
  int getEdgeGroupsSize() const { return edgeGroupsSize_; }

private:
  float* linesPtr_;
  int32_t* edgeGroupsPtr_;
  int linesSize_;
  int edgeGroupsSize_;

  friend ReplicadEdgeMeshData ReplicadExtractEdgeMesh(
    const TopoDS_Shape&,
    double,
    double);
};

inline void ReplicadEnsureEdgeMesh(
  const TopoDS_Shape& shape,
  double tolerance,
  double angularTolerance
) {
  if (BRepTools::Triangulation(shape, tolerance, false)) return;

  BRepMesh_IncrementalMesh mesher(
    shape,
    tolerance,
    false,
    angularTolerance,
    ReplicadConfigureThreadPool() > 1);
}

template <typename Visitor>
void ReplicadVisitRenderableEdges(
  const TopoDS_Shape& shape,
  double tolerance,
  double angularTolerance,
  const Visitor& visit
) {
  NCollection_Map<TopoDS_Shape, TopTools_ShapeMapHasher> seenEdges;

  for (TopExp_Explorer faceExplorer(shape, TopAbs_FACE);
       faceExplorer.More();
       faceExplorer.Next()) {
    const TopoDS_Face& face = TopoDS::Face(faceExplorer.Current());
    TopLoc_Location faceLocation;
    Handle(Poly_Triangulation) triangulation =
      BRep_Tool::Triangulation(face, faceLocation);
    if (triangulation.IsNull()) continue;

    for (TopExp_Explorer edgeExplorer(face, TopAbs_EDGE);
         edgeExplorer.More();
         edgeExplorer.Next()) {
      const TopoDS_Edge& edge = TopoDS::Edge(edgeExplorer.Current());
      if (seenEdges.Contains(edge)) continue;

      Handle(Poly_PolygonOnTriangulation) polygon =
        BRep_Tool::PolygonOnTriangulation(edge, triangulation, faceLocation);
      if (polygon.IsNull() || polygon->Nodes().Length() < 2) continue;

      seenEdges.Add(edge);
      visit(edge, triangulation, polygon, faceLocation, polygon->Nodes().Length());
    }
  }

  for (TopExp_Explorer edgeExplorer(shape, TopAbs_EDGE);
       edgeExplorer.More();
       edgeExplorer.Next()) {
    const TopoDS_Edge& edge = TopoDS::Edge(edgeExplorer.Current());
    if (seenEdges.Contains(edge)) continue;

    BRepAdaptor_Curve adaptor(edge);
    GCPnts_TangentialDeflection deflection(
      adaptor,
      angularTolerance,
      tolerance,
      2,
      1e-9,
      1e-7);
    if (deflection.NbPoints() < 2) continue;

    seenEdges.Add(edge);
    Handle(Poly_Triangulation) noTriangulation;
    Handle(Poly_PolygonOnTriangulation) noPolygon;
    visit(edge, noTriangulation, noPolygon, TopLoc_Location(), deflection.NbPoints());
  }
}

inline ReplicadEdgeMeshData ReplicadExtractEdgeMesh(
  const TopoDS_Shape& shape,
  double tolerance,
  double angularTolerance
) {
  ReplicadEnsureEdgeMesh(shape, tolerance, angularTolerance);
  int totalSegments = 0;
  int totalEdges = 0;
  ReplicadVisitRenderableEdges(
    shape,
    tolerance,
    angularTolerance,
    [&](const TopoDS_Edge&,
        const Handle(Poly_Triangulation)&,
        const Handle(Poly_PolygonOnTriangulation)&,
        const TopLoc_Location&,
        int pointCount) {
      totalSegments += pointCount - 1;
      totalEdges++;
    });

  ReplicadEdgeMeshData result;
  result.linesSize_ = totalSegments * 6;
  if (result.linesSize_ > 0) {
    result.linesPtr_ = static_cast<float*>(
      std::malloc(result.linesSize_ * sizeof(float)));
    if (!result.linesPtr_) throw std::bad_alloc();
  }

  result.edgeGroupsSize_ = totalEdges * 3;
  if (result.edgeGroupsSize_ > 0) {
    result.edgeGroupsPtr_ = static_cast<int32_t*>(
      std::malloc(result.edgeGroupsSize_ * sizeof(int32_t)));
    if (!result.edgeGroupsPtr_) throw std::bad_alloc();
  }

  int lineOffset = 0;
  int groupOffset = 0;

  ReplicadVisitRenderableEdges(
    shape,
    tolerance,
    angularTolerance,
    [&](const TopoDS_Edge& edge,
        const Handle(Poly_Triangulation)& triangulation,
        const Handle(Poly_PolygonOnTriangulation)& polygon,
        const TopLoc_Location& location,
        int) {
      const int lineStart = lineOffset / 3;
      gp_Pnt previous;
      bool hasPrevious = false;

      if (!polygon.IsNull()) {
        const NCollection_Array1<int>& nodes = polygon->Nodes();
        const gp_Trsf& transformation = location.Transformation();
        for (int index = nodes.Lower(); index <= nodes.Upper(); index++) {
          const gp_Pnt point = triangulation->Node(nodes.Value(index))
            .Transformed(transformation);
          if (hasPrevious) {
            result.linesPtr_[lineOffset++] = static_cast<float>(previous.X());
            result.linesPtr_[lineOffset++] = static_cast<float>(previous.Y());
            result.linesPtr_[lineOffset++] = static_cast<float>(previous.Z());
            result.linesPtr_[lineOffset++] = static_cast<float>(point.X());
            result.linesPtr_[lineOffset++] = static_cast<float>(point.Y());
            result.linesPtr_[lineOffset++] = static_cast<float>(point.Z());
          }
          previous = point;
          hasPrevious = true;
        }
      } else {
        BRepAdaptor_Curve adaptor(edge);
        GCPnts_TangentialDeflection deflection(
          adaptor,
          angularTolerance,
          tolerance,
          2,
          1e-9,
          1e-7);
        for (int index = 1; index <= deflection.NbPoints(); index++) {
          const gp_Pnt point = deflection.Value(index);
          if (hasPrevious) {
            result.linesPtr_[lineOffset++] = static_cast<float>(previous.X());
            result.linesPtr_[lineOffset++] = static_cast<float>(previous.Y());
            result.linesPtr_[lineOffset++] = static_cast<float>(previous.Z());
            result.linesPtr_[lineOffset++] = static_cast<float>(point.X());
            result.linesPtr_[lineOffset++] = static_cast<float>(point.Y());
            result.linesPtr_[lineOffset++] = static_cast<float>(point.Z());
          }
          previous = point;
          hasPrevious = true;
        }
      }

      result.edgeGroupsPtr_[groupOffset++] = lineStart;
      result.edgeGroupsPtr_[groupOffset++] = (lineOffset / 3) - lineStart;
      result.edgeGroupsPtr_[groupOffset++] =
        ReplicadShapeHashCode(edge, ReplicadShapeHashUpperBound);
    });

  return result;
}

class ReplicadEdgeMeshExtractor {
public:
  static ReplicadEdgeMeshData extract(
    const TopoDS_Shape& shape,
    double tolerance,
    double angularTolerance
  ) {
    return ReplicadExtractEdgeMesh(
      shape,
      tolerance,
      angularTolerance);
  }
};
