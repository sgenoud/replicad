import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useFrame } from "@react-three/fiber";

const forwardVector = new THREE.Vector3(0, 0, -1);

function initStencilMaterials(sideColor = "yellow") {
  // PASS 1
  // everywhere that the back faces are visible (clipped region) the stencil
  // buffer is incremented by 1.
  const backFaceStencilMat = new THREE.MeshBasicMaterial();
  backFaceStencilMat.depthWrite = false;
  backFaceStencilMat.depthTest = false;
  backFaceStencilMat.colorWrite = false;
  backFaceStencilMat.stencilWrite = true;
  backFaceStencilMat.stencilFunc = THREE.AlwaysStencilFunc;
  backFaceStencilMat.side = THREE.BackSide;
  backFaceStencilMat.stencilFail = THREE.IncrementWrapStencilOp;
  backFaceStencilMat.stencilZFail = THREE.IncrementWrapStencilOp;
  backFaceStencilMat.stencilZPass = THREE.IncrementWrapStencilOp;

  // PASS 2
  // everywhere that the front faces are visible the stencil
  // buffer is decremented back to 0.
  const frontFaceStencilMat = new THREE.MeshBasicMaterial();
  frontFaceStencilMat.depthWrite = false;
  frontFaceStencilMat.depthTest = false;
  frontFaceStencilMat.colorWrite = false;
  frontFaceStencilMat.stencilWrite = true;
  frontFaceStencilMat.stencilFunc = THREE.AlwaysStencilFunc;
  frontFaceStencilMat.side = THREE.FrontSide;
  frontFaceStencilMat.stencilFail = THREE.DecrementWrapStencilOp;
  frontFaceStencilMat.stencilZFail = THREE.DecrementWrapStencilOp;
  frontFaceStencilMat.stencilZPass = THREE.DecrementWrapStencilOp;

  // PASS 3
  // draw the plane everywhere that the stencil buffer != 0, which will
  // only be in the clipped region where back faces are visible.
  const planeStencilMat = new THREE.MeshBasicMaterial({
    color: sideColor,
  });
  planeStencilMat.stencilWrite = true;
  planeStencilMat.stencilRef = 0;

  planeStencilMat.stencilFunc = THREE.NotEqualStencilFunc;
  planeStencilMat.stencilFail = THREE.ReplaceStencilOp;
  planeStencilMat.stencilZFail = THREE.ReplaceStencilOp;
  planeStencilMat.stencilZPass = THREE.ReplaceStencilOp;

  return [frontFaceStencilMat, backFaceStencilMat, planeStencilMat];
}

export default function ClipPlane({ clippingPlane, sideColor, children }) {
  const groupRef = useRef(null);
  const planeMeshRef = useRef();

  useEffect(() => {
    const group = groupRef.current;

    if (!clippingPlane) {
      group.traverse((node) => {
        if (!(node instanceof THREE.Mesh || node instanceof THREE.LineSegments))
          return;
        if (Array.isArray(node.material)) {
          node.material.forEach((n) => (n.clippingPlanes = []));
        } else node.material.clippingPlanes = [];
      });

      return;
    }
    const [frontFaceStencilMat, backFaceStencilMat, planeStencilMat] =
      initStencilMaterials(sideColor);

    frontFaceStencilMat.clippingPlanes = [clippingPlane];
    backFaceStencilMat.clippingPlanes = [clippingPlane];

    group.traverse((node) => {
      if (!(node instanceof THREE.Mesh || node instanceof THREE.LineSegments))
        return;
      if (Array.isArray(node.material)) {
        node.material.forEach((n) => (n.clippingPlanes = [clippingPlane]));
      } else node.material.clippingPlanes = [clippingPlane];
    });

    const front = group.clone();
    front.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      node.material = frontFaceStencilMat;
    });

    const back = group.clone();
    back.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      node.material = backFaceStencilMat;
    });

    const planeGeom = new THREE.PlaneGeometry();
    const planeMesh = new THREE.Mesh(planeGeom, planeStencilMat);

    planeMesh.quaternion.setFromUnitVectors(
      forwardVector,
      clippingPlane.normal
    );

    // We need double the radius to make sure to cover the whole object
    const bbox = new THREE.Box3().setFromObject(group);
    const radius = Math.max(
      bbox.max.distanceTo(new THREE.Vector3()),
      bbox.min.distanceTo(new THREE.Vector3())
    );
    planeMesh.scale.setScalar(radius * 2);

    planeMesh.renderOrder = 2;
    planeMeshRef.current = planeMesh;
    planeMesh.position.copy(
      clippingPlane.normal.clone().multiplyScalar(-clippingPlane.constant)
    );

    group.add(front, back, planeMesh);

    return () => {
      group.remove(front, back, planeMesh);
    };
  }, [clippingPlane, sideColor]);

  useFrame(() => {
    if (!clippingPlane) return;
    planeMeshRef.current.position.copy(
      clippingPlane.normal.clone().multiplyScalar(-clippingPlane.constant)
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
