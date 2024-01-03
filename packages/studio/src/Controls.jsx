import React, { useRef } from "react";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import Stage from "./Stage.jsx";

const Controls = React.memo(
  React.forwardRef(function Controls(
    { hideGizmo, enableDamping },
    controlsRef
  ) {
    return (
      <>
        <OrbitControls
          makeDefault
          ref={controlsRef}
          enableDamping={enableDamping}
        />
        {!hideGizmo && (
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport font="18px Inter var, HKGrotesk, sans-serif" />
          </GizmoHelper>
        )}
      </>
    );
  })
);

export default React.memo(function Scene({
  hideGizmo,
  center,
  enableDamping = true,
  children,
}) {
  const controlsRef = useRef();

  return (
    <>
      <Controls
        hideGizmo={hideGizmo}
        ref={controlsRef}
        enableDamping={enableDamping}
      />
      <Stage constrols={controlsRef} center={center}>
        {children}
      </Stage>
    </>
  );
});
