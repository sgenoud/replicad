// BREP file Read/Write wrapper -- exposes BRepTools::Read/Write to JS via
// std::string round-trip (BRepTools' own stream API isn't directly
// embind-friendly). Used by replicad to serialise shapes for the
// off-thread CAD worker and for project save/load.

class BRepToolsWrapper {
public:
  static std::string Write(const TopoDS_Shape& shape) {
    std::ostringstream oss(std::ios::binary);
    oss << std::setprecision(17);
    BRepTools::Write(shape, oss);
    return oss.str();
  }
  static TopoDS_Shape Read(const std::string& data) {
    std::istringstream iss(data, std::ios::binary);
    TopoDS_Shape shape;
    BRep_Builder builder;
    Message_ProgressRange progress;
    BRepTools::Read(shape, iss, builder, progress);
    return shape;
  }
};
