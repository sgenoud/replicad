// Face-triangulation extractor used by replicad's render path.
//
// `ReplicadMeshExtractor::extract` walks every TopoDS_Face in a shape,
// runs BRepMesh_IncrementalMesh, then packs the resulting triangulation
// into four malloc'd arrays exposed to JS as raw integer pointers:
//   vertices   : float[]    (xyz per node, length = 3 * total_nodes)
//   normals    : float[]    (xyz per node; omitted when skipNormals=true)
//   triangles  : uint32[]   (3 vertex indices per triangle, into vertices)
//   faceGroups : int32[]    ({triStart, triCount, faceHash} per face)
//
// Normals are sampled via BRepLProp_SLProps after stripping the face
// orientation/location to FORWARD/identity, mirroring OCCT's own
// `RWMesh_FaceIterator::initFace()` pattern so JS-side rendering aligns
// with OCCT's expected surface frame.
//
// Triangle winding is flipped when the face is REVERSED xor the trsf is
// mirrored (negative determinant), keeping outward-facing normals
// consistent for downstream backface culling.

#include <BRepLProp_SLProps.hxx>
#include <BRepAdaptor_Surface.hxx>
#include <Precision.hxx>

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
    auto& m = const_cast<ReplicadMeshData&>(other);
    m.verticesPtr_ = nullptr;
    m.normalsPtr_ = nullptr;
    m.trianglesPtr_ = nullptr;
    m.faceGroupsPtr_ = nullptr;
  }

  int getVerticesPtr() const  { return static_cast<int>(reinterpret_cast<uintptr_t>(verticesPtr_)); }
  int getNormalsPtr() const   { return static_cast<int>(reinterpret_cast<uintptr_t>(normalsPtr_)); }
  int getTrianglesPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(trianglesPtr_)); }
  int getFaceGroupsPtr() const { return static_cast<int>(reinterpret_cast<uintptr_t>(faceGroupsPtr_)); }

  int getVerticesSize() const   { return verticesSize_; }
  int getNormalsSize() const    { return normalsSize_; }
  int getTrianglesSize() const  { return trianglesSize_; }
  int getFaceGroupsSize() const { return faceGroupsSize_; }

private:
  float*    verticesPtr_;
  float*    normalsPtr_;
  uint32_t* trianglesPtr_;
  int32_t*  faceGroupsPtr_;

  int verticesSize_;
  int normalsSize_;
  int trianglesSize_;
  int faceGroupsSize_;

  friend class ReplicadMeshExtractor;
};

class ReplicadMeshExtractor {
public:
  static ReplicadMeshData extract(
    const TopoDS_Shape& shape,
    double tolerance,
    double angularTolerance,
    bool skipNormals
  ) {
    BRepTools::Clean(shape, false);
    BRepMesh_IncrementalMesh mesher(shape, tolerance, false, angularTolerance, false);

    int totalNodes = 0;
    int totalTriangles = 0;
    int totalFaces = 0;

    for (TopExp_Explorer ex(shape, TopAbs_FACE); ex.More(); ex.Next()) {
      TopLoc_Location loc;
      Handle(Poly_Triangulation) tri = BRep_Tool::Triangulation(
        TopoDS::Face(ex.Current()), loc);
      if (tri.IsNull()) continue;
      totalNodes += tri->NbNodes();
      totalTriangles += tri->NbTriangles();
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
    int triOffset = 0;
    int faceGroupIdx = 0;

    for (TopExp_Explorer ex(shape, TopAbs_FACE); ex.More(); ex.Next()) {
      const TopoDS_Face& face = TopoDS::Face(ex.Current());
      TopLoc_Location loc;
      Handle(Poly_Triangulation) tri = BRep_Tool::Triangulation(face, loc);
      if (tri.IsNull()) continue;

      const gp_Trsf& trsf = loc.Transformation();
      int nbNodes = tri->NbNodes();
      int nbTri = tri->NbTriangles();

      for (int i = 1; i <= nbNodes; i++) {
        gp_Pnt p = tri->Node(i).Transformed(trsf);
        int base = (vertexOffset + i - 1) * 3;
        result.verticesPtr_[base + 0] = static_cast<float>(p.X());
        result.verticesPtr_[base + 1] = static_cast<float>(p.Y());
        result.verticesPtr_[base + 2] = static_cast<float>(p.Z());
      }

      bool isReversed = (face.Orientation() == TopAbs_REVERSED);

      if (!skipNormals) {
        // Align with OCCT RWMesh_FaceIterator::initFace() pattern:
        // strip orientation to FORWARD then clear location.
        TopoDS_Face faceFwd = TopoDS::Face(face.Oriented(TopAbs_FORWARD));
        faceFwd.Location(TopLoc_Location());

        TopLoc_Location surfLoc;
        bool hasSurface = !BRep_Tool::Surface(faceFwd, surfLoc).IsNull();

        if (hasSurface) {
          BRepAdaptor_Surface adaptor(faceFwd, false);
          BRepLProp_SLProps slProps(adaptor, 1, 1e-12);

          for (int i = 1; i <= nbNodes; i++) {
            gp_Dir d(0, 0, 1);
            if (tri->HasUVNodes()) {
              gp_Pnt2d uv = tri->UVNode(i);
              slProps.SetParameters(uv.X(), uv.Y());
              if (slProps.IsNormalDefined()) {
                d = slProps.Normal();
              }
            }
            d.Transform(trsf);
            if (isReversed) {
              d.Reverse();
            }
            int base = (vertexOffset + i - 1) * 3;
            result.normalsPtr_[base + 0] = static_cast<float>(d.X());
            result.normalsPtr_[base + 1] = static_cast<float>(d.Y());
            result.normalsPtr_[base + 2] = static_cast<float>(d.Z());
          }
        } else {
          for (int i = 1; i <= nbNodes; i++) {
            int base = (vertexOffset + i - 1) * 3;
            result.normalsPtr_[base + 0] = 0.0f;
            result.normalsPtr_[base + 1] = 0.0f;
            result.normalsPtr_[base + 2] = 1.0f;
          }
        }
      }

      bool isMirrored = (trsf.VectorialPart().Determinant() < 0.0);

      int faceTriStart = triOffset;
      for (int t = 1; t <= nbTri; t++) {
        const Poly_Triangle& triangle = tri->Triangle(t);
        int n1 = triangle.Value(1);
        int n2 = triangle.Value(2);
        int n3 = triangle.Value(3);

        if (isReversed ^ isMirrored) {
          int tmp = n2;
          n2 = n3;
          n3 = tmp;
        }

        result.trianglesPtr_[triOffset + 0] = static_cast<uint32_t>(n1 - 1 + vertexOffset);
        result.trianglesPtr_[triOffset + 1] = static_cast<uint32_t>(n2 - 1 + vertexOffset);
        result.trianglesPtr_[triOffset + 2] = static_cast<uint32_t>(n3 - 1 + vertexOffset);
        triOffset += 3;
      }

      int faceHash = static_cast<int>(TopTools_ShapeMapHasher{}(face) % 2147483647);
      result.faceGroupsPtr_[faceGroupIdx + 0] = faceTriStart;
      result.faceGroupsPtr_[faceGroupIdx + 1] = (triOffset - faceTriStart);
      result.faceGroupsPtr_[faceGroupIdx + 2] = faceHash;
      faceGroupIdx += 3;

      vertexOffset += nbNodes;
    }

    return result;
  }
};
