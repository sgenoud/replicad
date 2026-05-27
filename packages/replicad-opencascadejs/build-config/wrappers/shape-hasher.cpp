// Hash adapter for TopoDS_Shape, exposed to JS as a class with a static
// HashCode(shape, _) method so replicad can build shape -> id maps in JS.
//
// Uses std::hash<TopoDS_Shape> from OCCT 8.x (TopoDS_TShape::HashCode
// dispatcher), keyed by the underlying TShape* identity so two TopoDS_Shape
// handles to the same TShape compare equal.

class OCJS_ShapeHasher {
public:
  static size_t HashCode(const TopoDS_Shape& shape, int) {
    return std::hash<TopoDS_Shape>{}(shape);
  }
};
