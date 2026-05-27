// Geom2d curve Read/Write wrapper -- exposes GeomTools::Read/Write to JS
// via std::string round-trip. Mirrors BRepToolsWrapper for 2D parametric
// curves; replicad uses this to persist sketch geometry alongside BREP
// data in the same string-blob storage path.

class GeomToolsWrapper {
public:
  static std::string Write(const opencascade::handle<Geom2d_Curve>& geometry) {
    std::ostringstream oss(std::ios::binary);
    oss << std::setprecision(17);
    GeomTools::Write(geometry, oss);
    return oss.str();
  }
  static opencascade::handle<Geom2d_Curve> Read(const std::string& data) {
    std::istringstream iss(data, std::ios::binary);
    opencascade::handle<Geom2d_Curve> geometry;
    GeomTools::Read(geometry, iss);
    return geometry;
  }
};
