import styled from "styled-components";

export const InfoTopRight = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3.5em;
  right: 2em;
  max-width: 300px;
  padding: 10px;
  border-radius: 10px;
  max-height: calc(100% - 5em);
  overflow-y: auto;

  ${(props) =>
    props.noBg ? "" : `background-color: white; border: 1px solid lightgrey;`}
`;

export const InfoBottomLeft = styled(InfoTopRight)`
  top: auto;
  right: auto;
  bottom: 2em;
  left: 2em;
`;

export const InfoBottomRight = styled(InfoTopRight)`
  top: auto;
  bottom: 2em;
`;

export const InfoTopLeft = styled(InfoTopRight)`
  right: auto;
  left: 2em;
`;
