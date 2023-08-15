import styled from "styled-components";
import { InfoTopLeft } from "./FloatingInfo.jsx";
import { Button } from "./Button.jsx";

export const InfoMenu = styled(InfoTopLeft)`
  & > * {
    flex-shrink: 0;
  }
  & > :not(:first-child) {
    margin-top: 0.3em;
  }

  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;

  :hover {
    opacity: 1;
  }

  @media (max-width: 400px) {
    margin-top: 40px;
  }
`;
export const ContextButton = styled(Button)`
  font-size: 1.5em;
  position: relative;
  margin: auto;
`;
