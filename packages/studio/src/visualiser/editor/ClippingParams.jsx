import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { ParamsSection, LabelledBlock } from "../../components/ToolUI";

import useEditorStore from "./useEditorStore";

const NumberEditor = React.memo(function NumberEditor({
  value,
  onChange,
  ...props
}) {
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const StyledInput = styled.input`
    text-align: right;
    outline: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    font-family: inherit;
    border: none;
    appearance: none;
    padding: 0 6px;
    height: 24px;
    line-height: 1.15;
    border-radius: 3px;

    &:hover {
      box-shadow: inset 0 0 0 1px var(--color-primary);
    }
  `;

  const handleChange = (e) => {
    const parsed = parseFloat(e.target.value);

    if (Number.isFinite(parsed)) {
      onChange(parsed);
      setVal(parsed);
    } else {
      setVal(value);
    }
  };

  return (
    <StyledInput type="number" onChange={handleChange} value={val} {...props} />
  );
});

const Planes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;

  background-color: var(--bg-color);

  & > label {
    display: flex;
    align-items: center;
  }
`;

const LabelText = styled.span`
  margin-left: 0.2em;
  margin-right: 0.2em;
  text-align: center;

  color: var(--color-primary);
`;

const PLANE_TO_NORMAL = {
  XY: "Z",
  YZ: "X",
  XZ: "Y",
};

export default observer(function ClippingParams() {
  const store = useEditorStore();
  return (
    <ParamsSection>
      <LabelledBlock label="Clipping Planes">
        <Planes>
          <label>
            <input
              onClick={() => store.ui.clip.setPlane("XY")}
              checked={store.ui.clip.plane === "XY"}
              type="radio"
            />
            <LabelText>XY</LabelText>
          </label>
          <label>
            <input
              onClick={() => store.ui.clip.setPlane("XZ")}
              checked={store.ui.clip.plane === "XZ"}
              type="radio"
            />
            <LabelText>XZ</LabelText>
          </label>
          <label>
            <input
              onClick={() => store.ui.clip.setPlane("YZ")}
              checked={store.ui.clip.plane === "YZ"}
              type="radio"
            />
            <LabelText>YZ</LabelText>
          </label>
        </Planes>
      </LabelledBlock>
      <LabelledBlock
        label={`${PLANE_TO_NORMAL[store.ui.clip.plane]} position`}
        labelFor="clippingPosition"
      >
        <NumberEditor
          id="clippingPosition"
          value={store.ui.clip.constant}
          onChange={(v) => store.ui.clip.setConstant(v)}
        />
      </LabelledBlock>
    </ParamsSection>
  );
});
