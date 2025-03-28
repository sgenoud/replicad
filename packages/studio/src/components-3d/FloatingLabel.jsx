import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import { Vector3 } from "three";

export function Label3D({
  start,
  end,
  text,
  position: inputPosition = "auto",

  color = "white",
  fontSize = 4,
  offset = [0, 1, 0],
  lineWidth = 3,
  lineMode = "length",
  lineColor,
}) {
  const textRef = useRef();

  // Convert arrays to Vector3
  const startVector = useMemo(() => new Vector3(...start), [start]);
  const endVector = useMemo(() => new Vector3(...end), [end]);
  const offsetVector = useMemo(() => {
    const v = new Vector3(...offset);
    return v.normalize();
  }, [offset]);

  const offsetSize = fontSize / 2;

  const position = useMemo(() => {
    if (inputPosition === "auto" && lineMode === "length") {
      const diffZ = Math.abs(startVector.z - endVector.z);
      const diffXY = Math.sqrt(
        (startVector.x - endVector.x) ** 2 + (startVector.y - endVector.y) ** 2
      );
      return diffZ < diffXY / 2 ? "top" : "side";
    }
    if (inputPosition === "auto" && lineMode === "point") {
      return "top";
    }
    return inputPosition;
  });

  const camera = useThree((state) => state.camera);

  let labelPosition = endVector.clone();

  if (lineMode === "length") {
    // Calculate midpoint
    labelPosition = new Vector3()
      .addVectors(startVector, endVector)
      .multiplyScalar(0.5)
      .addScaledVector(
        offsetVector,
        offsetSize * (position === "side" ? 1.5 : 1)
      );
  }

  useFrame(() => {
    if (!textRef.current) return;
    textRef.current.quaternion.copy(camera.quaternion);
  });

  const barPoint = (point) => {
    return [
      point.clone().addScaledVector(offsetVector, offsetSize * 0.5),
      new Vector3().add(point).addScaledVector(offsetVector, offsetSize * 1.5),
    ];
  };

  let line;

  if (lineMode === "length") {
    line = (
      <>
        <Line
          points={[
            new Vector3()
              .add(startVector)
              .addScaledVector(offsetVector, offsetSize),
            new Vector3()
              .add(endVector)
              .addScaledVector(offsetVector, offsetSize),
          ]}
          lineWidth={lineWidth}
          color={lineColor || color}
        />
        <Line
          points={barPoint(startVector)}
          lineWidth={lineWidth}
          color={lineColor || color}
        />
        <Line
          points={barPoint(endVector)}
          lineWidth={lineWidth}
          color={lineColor || color}
        />
      </>
    );
  }

  if (lineMode === "point") {
    line = (
      <>
        <Line
          points={[startVector, endVector]}
          lineWidth={lineWidth}
          color={lineColor || color}
        />
      </>
    );
  }

  return (
    <group>
      {line}
      <Text
        color={color}
        textAlign={position === "side" ? "left" : "center"}
        outlineColor={lineColor}
        outlineWidth={fontSize / 20}
        fontSize={fontSize}
        position={labelPosition}
        anchorX={position === "side" ? "left" : "center"}
        anchorY={
          position === "side" ? "middle" : position === "top" ? "bottom" : "top"
        }
        ref={textRef}
      >
        {text}
      </Text>
    </group>
  );
}
