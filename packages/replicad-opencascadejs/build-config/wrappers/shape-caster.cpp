#include <TopoDS.hxx>
#include <TopoDS_CompSolid.hxx>
#include <TopoDS_Shape.hxx>

class ReplicadShapeCaster {
public:
  static TopoDS_CompSolid CompSolid(const TopoDS_Shape& shape) {
    return TopoDS::CompSolid(shape);
  }
};
