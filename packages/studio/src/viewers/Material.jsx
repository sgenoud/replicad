import React from "react";
import { useTexture } from "@react-three/drei";

export default function Material(props) {
  const [matcap1] = useTexture(["/textures/matcap-1.png"]);
  return <meshMatcapMaterial color="#5a8296" matcap={matcap1} {...props} />;
}

export function MeshMaterial(props) {
  const [matcap2] = useTexture(["/textures/matcap-2.png"]);
  return <meshMatcapMaterial color="#5a8296" matcap={matcap2} {...props} />;
}
