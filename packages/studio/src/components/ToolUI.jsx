import React from "react";
import styled from "styled-components";

export const ParamsSection = styled.div`
  background-color: var(--bg-color);
  font-family: ui-monospace, SFMono-Regular, Menlo, "Roboto Mono", monospace;
  font-size: 11px;

  padding-top: 10px;
  padding-bottom: 10px;

  row-gap: 10px;
`;

export const LabelledBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;

  & > label {
    display: flex;
    height: 24px;
    align-items: center;
    color: var(--color-primary);
  }
`;

export const LabelledBlock = ({ label, labelFor, children }) => {
  return (
    <LabelledBlockWrapper>
      <label htmlFor={labelFor}>{label}</label>
      {children}
    </LabelledBlockWrapper>
  );
};
