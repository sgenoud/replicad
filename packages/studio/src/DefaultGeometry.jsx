import React, { useRef, useLayoutEffect } from "react";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function DefaultGeometry() {
  const camera = useThree((state) => state.camera);
  const set = useThree((state) => state.set);
  const frameloop = useThree((state) => state.frameloop);
  const originalFrameloop = useRef(frameloop);

  useLayoutEffect(() => {
    if (originalFrameloop.current !== "demand") return;
    set({ frameloop: "always" });
    return () => set({ frameloop: "demand" });
  }, [set]);

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={camera.position} intensity={1} />

      <Sphere scale={100} args={[1, 32, 32]}>
        <MeshDistortMaterial
          attach="material"
          color={0x5a8296}
          speed={3}
          distort={0.6}
          radius={1}
        />
      </Sphere>
    </group>
  );
}
