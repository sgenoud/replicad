import React from "react";
import styled from "styled-components";

import { observer } from "mobx-react";

import useEditorStore from "../../visualiser/editor/useEditorStore";
const FaceInfoWrapper = styled.div`
  font-size: 0.9em;
`;

const Coords = styled.span`
  font-size: 0.8em;
  font-family: monospace;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  user-select: all;
`;

const Type = styled.span`
  font-family: monospace;
`;

const formatVector = (data) => {
  return `[${data.map((c) => c.toFixed(2)).join(", ")}]`;
};

export const FaceInfo = observer(() => {
  const store = useEditorStore();
  if (!store.selectedInfo.faceInfo) return null;
  return (
    <FaceInfoWrapper>
      <div>
        Face <strong>{store.selectedInfo.currentFace}</strong>
      </div>
      {store.selectedInfo.faceInfo && (
        <>
          <div>
            type: <Type>{store.selectedInfo.faceInfo.type}</Type>
          </div>
          <div>
            center:{" "}
            <Coords>{formatVector(store.selectedInfo.faceInfo?.center)}</Coords>
          </div>
          <div>
            normal:{" "}
            <Coords>{formatVector(store.selectedInfo.faceInfo?.normal)}</Coords>
          </div>
        </>
      )}
    </FaceInfoWrapper>
  );
});

export const EdgeInfo = observer(() => {
  const store = useEditorStore();
  if (!store.selectedInfo.edgeInfo) return null;
  return (
    <FaceInfoWrapper>
      <div>
        Edge <strong>{store.selectedInfo.currentEdge}</strong>
      </div>
      {store.selectedInfo.edgeInfo && (
        <>
          <div>
            type: <Type>{store.selectedInfo.edgeInfo.type}</Type>
          </div>
          <div>
            start:{" "}
            <Coords>{formatVector(store.selectedInfo.edgeInfo?.start)}</Coords>
          </div>
          <div>
            end:{" "}
            <Coords>{formatVector(store.selectedInfo.edgeInfo?.end)}</Coords>
          </div>
          <div>
            direction:{" "}
            <Coords>
              {formatVector(store.selectedInfo.edgeInfo?.direction)}
            </Coords>
          </div>
        </>
      )}
    </FaceInfoWrapper>
  );
});
