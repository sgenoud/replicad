// Bounded, runtime-local topology labels used by Replicad's public hashCode,
// face groups, and edge groups. This preserves the pre-OCCT-8 API contract:
// TShape plus location, orientation ignored, result in [1, upperBound].
//
#include <cstdint>
#include <limits>

constexpr int32_t ReplicadShapeHashUpperBound = std::numeric_limits<int32_t>::max();

inline int32_t ReplicadShapeHashCode(const TopoDS_Shape& shape, int32_t upperBound) {
  return static_cast<int32_t>(
    TopTools_ShapeMapHasher{}(shape) % static_cast<std::size_t>(upperBound) + 1);
}

class ReplicadShapeHasher {
public:
  static int32_t HashCode(const TopoDS_Shape& shape, int32_t upperBound) {
    return ReplicadShapeHashCode(shape, upperBound);
  }
};
