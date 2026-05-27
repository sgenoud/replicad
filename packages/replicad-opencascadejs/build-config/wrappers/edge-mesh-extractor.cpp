// Edge-polyline extractor used by replicad's wireframe rendering path.
//
// `ReplicadEdgeMeshExtractor::extract` walks every TopoDS_Edge in a shape
// and emits a packed line-soup suitable for direct upload to a WebGL/WebGPU
// vertex buffer:
//   lines        : float[]   (6 floats per segment: x1,y1,z1, x2,y2,z2)
//   edgeGroups   : int32[]   ({lineStart, segmentCount, edgeHash} per edge)
//
// Two-pass strategy:
//   1. For edges that are already triangulated on a face (`PolygonOnTriangulation`),
//      reuse the face's Poly_Triangulation nodes -- avoids re-meshing and keeps
//      edges perfectly coincident with triangle boundaries.
//   2. For "free" edges with no triangulation (typically wire-mode shapes),
//      fall back to `GCPnts_TangentialDeflection` curve tessellation with the
//      same tolerance/angularTolerance budget as the face mesher.
//
// `seenEdges` deduplicates edges shared between adjacent faces so a single
// shared edge contributes exactly one polyline.

#include <BRepAdaptor_Curve.hxx>
#include <GCPnts_TangentialDeflection.hxx>
#include <NCollection_Map.hxx>
#include <NCollection_Array1.hxx>

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
    auto& m = const_cast<ReplicadEdgeMeshData&>(other);
    m.linesPtr_ = nullptr;
    m.edgeGroupsPtr_ = nullptr;
  }

  int getLinesPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(linesPtr_)); }
  int getLinesSize() const { return linesSize_; }
  int getEdgeGroupsPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(edgeGroupsPtr_)); }
  int getEdgeGroupsSize() const { return edgeGroupsSize_; }

private:
  float*   linesPtr_;
  int32_t* edgeGroupsPtr_;
  int linesSize_;
  int edgeGroupsSize_;

  friend class ReplicadEdgeMeshExtractor;
};

class ReplicadEdgeMeshExtractor {
public:
  static ReplicadEdgeMeshData extract(
    const TopoDS_Shape& shape,
    double tolerance,
    double angularTolerance
  ) {
    BRepMesh_IncrementalMesh mesher(shape, tolerance, false, angularTolerance, false);

    NCollection_Map<TopoDS_Shape, TopTools_ShapeMapHasher> seenEdges;

    int totalSegments = 0;
    int totalEdges = 0;

    for (TopExp_Explorer faceEx(shape, TopAbs_FACE); faceEx.More(); faceEx.Next()) {
      const TopoDS_Face& face = TopoDS::Face(faceEx.Current());
      TopLoc_Location faceLoc;
      Handle(Poly_Triangulation) tri = BRep_Tool::Triangulation(face, faceLoc);
      if (tri.IsNull()) continue;

      for (TopExp_Explorer edgeEx(face, TopAbs_EDGE); edgeEx.More(); edgeEx.Next()) {
        const TopoDS_Edge& edge = TopoDS::Edge(edgeEx.Current());
        if (seenEdges.Contains(edge)) continue;

        TopLoc_Location edgeLoc;
        Handle(Poly_PolygonOnTriangulation) polygon =
          BRep_Tool::PolygonOnTriangulation(edge, tri, edgeLoc);
        if (polygon.IsNull()) continue;

        seenEdges.Add(edge);
        int nNodes = polygon->Nodes().Length();
        if (nNodes < 2) continue;
        totalSegments += (nNodes - 1);
        totalEdges++;
      }
    }

    struct CurveTessInfo { TopoDS_Edge edge; int nbPts; };
    std::vector<CurveTessInfo> curveEdges;

    for (TopExp_Explorer edgeEx(shape, TopAbs_EDGE); edgeEx.More(); edgeEx.Next()) {
      const TopoDS_Edge& edge = TopoDS::Edge(edgeEx.Current());
      if (seenEdges.Contains(edge)) continue;
      seenEdges.Add(edge);

      BRepAdaptor_Curve adaptor(edge);
      GCPnts_TangentialDeflection tangDef(adaptor, tolerance, angularTolerance, 2, 1e-9, 1e-7);
      int nbPts = tangDef.NbPoints();
      if (nbPts < 2) continue;

      totalSegments += (nbPts - 1);
      totalEdges++;
      curveEdges.push_back({edge, nbPts});
    }

    ReplicadEdgeMeshData result;

    result.linesSize_ = totalSegments * 6;
    if (result.linesSize_ > 0) {
      result.linesPtr_ = static_cast<float*>(std::malloc(result.linesSize_ * sizeof(float)));
      if (!result.linesPtr_) throw std::bad_alloc();
    }

    result.edgeGroupsSize_ = totalEdges * 3;
    if (result.edgeGroupsSize_ > 0) {
      result.edgeGroupsPtr_ = static_cast<int32_t*>(std::malloc(result.edgeGroupsSize_ * sizeof(int32_t)));
      if (!result.edgeGroupsPtr_) throw std::bad_alloc();
    }

    int lineOffset = 0;
    int groupOffset = 0;
    seenEdges.Clear();

    for (TopExp_Explorer faceEx(shape, TopAbs_FACE); faceEx.More(); faceEx.Next()) {
      const TopoDS_Face& face = TopoDS::Face(faceEx.Current());
      TopLoc_Location faceLoc;
      Handle(Poly_Triangulation) tri = BRep_Tool::Triangulation(face, faceLoc);
      if (tri.IsNull()) continue;

      for (TopExp_Explorer edgeEx(face, TopAbs_EDGE); edgeEx.More(); edgeEx.Next()) {
        const TopoDS_Edge& edge = TopoDS::Edge(edgeEx.Current());
        if (seenEdges.Contains(edge)) continue;

        TopLoc_Location edgeLoc;
        Handle(Poly_PolygonOnTriangulation) polygon =
          BRep_Tool::PolygonOnTriangulation(edge, tri, edgeLoc);
        if (polygon.IsNull()) continue;

        seenEdges.Add(edge);
        const NCollection_Array1<int>& nodes = polygon->Nodes();
        if (nodes.Length() < 2) continue;

        int lineStart = lineOffset / 3;
        int pointCount = 0;
        const gp_Trsf& trsf = edgeLoc.Transformation();

        gp_Pnt prevPt;
        bool hasPrev = false;

        for (int i = nodes.Lower(); i <= nodes.Upper(); i++) {
          gp_Pnt p = tri->Node(nodes.Value(i)).Transformed(trsf);
          if (hasPrev) {
            result.linesPtr_[lineOffset++] = static_cast<float>(prevPt.X());
            result.linesPtr_[lineOffset++] = static_cast<float>(prevPt.Y());
            result.linesPtr_[lineOffset++] = static_cast<float>(prevPt.Z());
            result.linesPtr_[lineOffset++] = static_cast<float>(p.X());
            result.linesPtr_[lineOffset++] = static_cast<float>(p.Y());
            result.linesPtr_[lineOffset++] = static_cast<float>(p.Z());
            pointCount += 2;
          }
          prevPt = p;
          hasPrev = true;
        }

        result.edgeGroupsPtr_[groupOffset++] = lineStart;
        result.edgeGroupsPtr_[groupOffset++] = pointCount;
        result.edgeGroupsPtr_[groupOffset++] = static_cast<int>(TopTools_ShapeMapHasher{}(edge) % 2147483647);
      }
    }

    for (const auto& info : curveEdges) {
      BRepAdaptor_Curve adaptor(info.edge);
      GCPnts_TangentialDeflection tangDef(adaptor, tolerance, angularTolerance, 2, 1e-9, 1e-7);

      int lineStart = lineOffset / 3;
      int pointCount = 0;

      gp_Pnt prevPt;
      bool hasPrev = false;

      for (int j = 1; j <= info.nbPts; j++) {
        gp_Pnt p = tangDef.Value(j);
        if (hasPrev) {
          result.linesPtr_[lineOffset++] = static_cast<float>(prevPt.X());
          result.linesPtr_[lineOffset++] = static_cast<float>(prevPt.Y());
          result.linesPtr_[lineOffset++] = static_cast<float>(prevPt.Z());
          result.linesPtr_[lineOffset++] = static_cast<float>(p.X());
          result.linesPtr_[lineOffset++] = static_cast<float>(p.Y());
          result.linesPtr_[lineOffset++] = static_cast<float>(p.Z());
          pointCount += 2;
        }
        prevPt = p;
        hasPrev = true;
      }

      result.edgeGroupsPtr_[groupOffset++] = lineStart;
      result.edgeGroupsPtr_[groupOffset++] = pointCount;
      result.edgeGroupsPtr_[groupOffset++] = static_cast<int>(TopTools_ShapeMapHasher{}(info.edge) % 2147483647);
    }

    return result;
  }
};
