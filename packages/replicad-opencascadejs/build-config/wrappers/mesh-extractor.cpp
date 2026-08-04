// Face-triangulation extractor used by Replicad's render path.
//
// `ReplicadMeshExtractor::extract` meshes the shape, walks every triangulated
// face occurrence, and packs four malloc'd arrays for bulk JS reads:
//   vertices   : float[]  (xyz per node)
//   normals    : float[]  (xyz per node; omitted when skipNormals=true)
//   triangles  : uint32[] (three vertex indices per triangle)
//   faceGroups : int32[]  ({indexStart, indexCount, faceHash} per face)
//
// Face occurrences are intentionally not deduplicated. Unlike shared edges,
// repeated faces in aggregate topology are observable output occurrences.

#include <BRepAdaptor_Surface.hxx>
#include <BRepLProp_SLProps.hxx>
#include <OSD_ThreadPool.hxx>
#include <Precision.hxx>
#include <cstdlib>

class ReplicadMeshData;
inline ReplicadMeshData ReplicadExtractFaceMesh(
  const TopoDS_Shape& shape,
  bool skipNormals);

inline int ReplicadConfigureThreadPool() {
#if defined(__EMSCRIPTEN_PTHREADS__)
  const Handle(OSD_ThreadPool)& pool = OSD_ThreadPool::DefaultPool(-1);
  const int threadCount = pool->NbThreads();
  pool->SetNbDefaultThreadsToLaunch(threadCount);
  return threadCount;
#else
  return 1;
#endif
}

class ReplicadMeshData {
public:
  ReplicadMeshData()
    : verticesPtr_(nullptr), normalsPtr_(nullptr),
      trianglesPtr_(nullptr), faceGroupsPtr_(nullptr),
      verticesSize_(0), normalsSize_(0),
      trianglesSize_(0), faceGroupsSize_(0) {}

  ~ReplicadMeshData() {
    std::free(verticesPtr_);
    std::free(normalsPtr_);
    std::free(trianglesPtr_);
    std::free(faceGroupsPtr_);
  }

  ReplicadMeshData(const ReplicadMeshData& other)
    : verticesPtr_(other.verticesPtr_), normalsPtr_(other.normalsPtr_),
      trianglesPtr_(other.trianglesPtr_), faceGroupsPtr_(other.faceGroupsPtr_),
      verticesSize_(other.verticesSize_), normalsSize_(other.normalsSize_),
      trianglesSize_(other.trianglesSize_), faceGroupsSize_(other.faceGroupsSize_) {
    auto& moved = const_cast<ReplicadMeshData&>(other);
    moved.verticesPtr_ = nullptr;
    moved.normalsPtr_ = nullptr;
    moved.trianglesPtr_ = nullptr;
    moved.faceGroupsPtr_ = nullptr;
  }

  int getVerticesPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(verticesPtr_)); }
  int getNormalsPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(normalsPtr_)); }
  int getTrianglesPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(trianglesPtr_)); }
  int getFaceGroupsPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(faceGroupsPtr_)); }
  int getVerticesSize() const { return verticesSize_; }
  int getNormalsSize() const { return normalsSize_; }
  int getTrianglesSize() const { return trianglesSize_; }
  int getFaceGroupsSize() const { return faceGroupsSize_; }

private:
  float* verticesPtr_;
  float* normalsPtr_;
  uint32_t* trianglesPtr_;
  int32_t* faceGroupsPtr_;
  int verticesSize_;
  int normalsSize_;
  int trianglesSize_;
  int faceGroupsSize_;

  friend ReplicadMeshData ReplicadExtractFaceMesh(
    const TopoDS_Shape&,
    bool);
};

inline ReplicadMeshData ReplicadExtractFaceMesh(
  const TopoDS_Shape& shape,
  bool skipNormals
) {
  int totalNodes = 0;
  int totalTriangles = 0;
  int totalFaces = 0;

  for (TopExp_Explorer explorer(shape, TopAbs_FACE); explorer.More(); explorer.Next()) {
    TopLoc_Location location;
    Handle(Poly_Triangulation) triangulation = BRep_Tool::Triangulation(
      TopoDS::Face(explorer.Current()), location);
    if (triangulation.IsNull()) continue;
    totalNodes += triangulation->NbNodes();
    totalTriangles += triangulation->NbTriangles();
    totalFaces++;
  }

  ReplicadMeshData result;
  result.verticesSize_ = totalNodes * 3;
  result.verticesPtr_ = static_cast<float*>(
    std::malloc(result.verticesSize_ * sizeof(float)));
  if (!result.verticesPtr_ && result.verticesSize_ > 0) throw std::bad_alloc();

  if (!skipNormals) {
    result.normalsSize_ = totalNodes * 3;
    result.normalsPtr_ = static_cast<float*>(
      std::malloc(result.normalsSize_ * sizeof(float)));
    if (!result.normalsPtr_ && result.normalsSize_ > 0) throw std::bad_alloc();
  }

  result.trianglesSize_ = totalTriangles * 3;
  result.trianglesPtr_ = static_cast<uint32_t*>(
    std::malloc(result.trianglesSize_ * sizeof(uint32_t)));
  if (!result.trianglesPtr_ && result.trianglesSize_ > 0) throw std::bad_alloc();

  result.faceGroupsSize_ = totalFaces * 3;
  result.faceGroupsPtr_ = static_cast<int32_t*>(
    std::malloc(result.faceGroupsSize_ * sizeof(int32_t)));
  if (!result.faceGroupsPtr_ && result.faceGroupsSize_ > 0) throw std::bad_alloc();

  int vertexOffset = 0;
  int triangleOffset = 0;
  int faceGroupOffset = 0;

  for (TopExp_Explorer explorer(shape, TopAbs_FACE); explorer.More(); explorer.Next()) {
    const TopoDS_Face& face = TopoDS::Face(explorer.Current());
    TopLoc_Location location;
    Handle(Poly_Triangulation) triangulation = BRep_Tool::Triangulation(face, location);
    if (triangulation.IsNull()) continue;

    const gp_Trsf& transformation = location.Transformation();
    const int nodeCount = triangulation->NbNodes();
    const int triangleCount = triangulation->NbTriangles();

    for (int index = 1; index <= nodeCount; index++) {
      const gp_Pnt point = triangulation->Node(index).Transformed(transformation);
      const int base = (vertexOffset + index - 1) * 3;
      result.verticesPtr_[base] = static_cast<float>(point.X());
      result.verticesPtr_[base + 1] = static_cast<float>(point.Y());
      result.verticesPtr_[base + 2] = static_cast<float>(point.Z());
    }

    const bool isReversed = face.Orientation() == TopAbs_REVERSED;
    if (!skipNormals) {
      TopoDS_Face forwardFace = TopoDS::Face(face.Oriented(TopAbs_FORWARD));
      forwardFace.Location(TopLoc_Location());

      TopLoc_Location surfaceLocation;
      const bool hasSurface = !BRep_Tool::Surface(forwardFace, surfaceLocation).IsNull();
      if (hasSurface) {
        BRepAdaptor_Surface adaptor(forwardFace, false);
        BRepLProp_SLProps properties(adaptor, 1, 1e-12);

        for (int index = 1; index <= nodeCount; index++) {
          gp_Dir normal(0, 0, 1);
          if (triangulation->HasUVNodes()) {
            const gp_Pnt2d uv = triangulation->UVNode(index);
            properties.SetParameters(uv.X(), uv.Y());
            if (properties.IsNormalDefined()) normal = properties.Normal();
          }
          normal.Transform(transformation);
          if (isReversed) normal.Reverse();

          const int base = (vertexOffset + index - 1) * 3;
          result.normalsPtr_[base] = static_cast<float>(normal.X());
          result.normalsPtr_[base + 1] = static_cast<float>(normal.Y());
          result.normalsPtr_[base + 2] = static_cast<float>(normal.Z());
        }
      } else {
        for (int index = 1; index <= nodeCount; index++) {
          const int base = (vertexOffset + index - 1) * 3;
          result.normalsPtr_[base] = 0.0f;
          result.normalsPtr_[base + 1] = 0.0f;
          result.normalsPtr_[base + 2] = 1.0f;
        }
      }
    }

    const bool isMirrored = transformation.VectorialPart().Determinant() < 0.0;
    const int faceTriangleStart = triangleOffset;

    for (int index = 1; index <= triangleCount; index++) {
      const Poly_Triangle& triangle = triangulation->Triangle(index);
      int first = triangle.Value(1);
      int second = triangle.Value(2);
      int third = triangle.Value(3);
      if (isReversed ^ isMirrored) std::swap(second, third);

      result.trianglesPtr_[triangleOffset] = static_cast<uint32_t>(first - 1 + vertexOffset);
      result.trianglesPtr_[triangleOffset + 1] = static_cast<uint32_t>(second - 1 + vertexOffset);
      result.trianglesPtr_[triangleOffset + 2] = static_cast<uint32_t>(third - 1 + vertexOffset);
      triangleOffset += 3;
    }

    result.faceGroupsPtr_[faceGroupOffset] = faceTriangleStart;
    result.faceGroupsPtr_[faceGroupOffset + 1] = triangleOffset - faceTriangleStart;
    result.faceGroupsPtr_[faceGroupOffset + 2] =
      ReplicadShapeHashCode(face, ReplicadShapeHashUpperBound);
    faceGroupOffset += 3;
    vertexOffset += nodeCount;
  }

  return result;
}

class ReplicadMeshExtractor {
public:
  static void mesh(
    const TopoDS_Shape& shape,
    double tolerance,
    double angularTolerance
  ) {
    // Replicad intentionally rebuilds the face mesh so a later, coarser
    // tolerance request is not silently served by OCCT's cached finer mesh.
    BRepTools::Clean(shape, false);
    BRepMesh_IncrementalMesh mesher(
      shape,
      tolerance,
      false,
      angularTolerance,
      ReplicadConfigureThreadPool() > 1);
  }

  static ReplicadMeshData extract(
    const TopoDS_Shape& shape,
    double tolerance,
    double angularTolerance,
    bool skipNormals
  ) {
    mesh(shape, tolerance, angularTolerance);
    return ReplicadExtractFaceMesh(shape, skipNormals);
  }
};
