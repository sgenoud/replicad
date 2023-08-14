import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.2em;
  background-color: transparent;
  border: 1px solid transparent;
  color: ${(props) => `var(--color-${props.color || "primary"})`};
  cursor: pointer;
  font: inherit;
  outline: inherit;
  font-size: 0.875em;
  letter-spacing: 1px;
  padding: 0.65em 1em;
  transition: all 100ms ease-in;
  text-transform: uppercase;
  width: ${(props) => props.width || "initial"};

  &:disabled {
    filter: grayscale(100%);
    opacity: 0.8;
    cursor: not-allowed;
  }

  ${(props) =>
    props.icon &&
    `
      color: ${`var(--color-${props.color || "primary"})`};
      border-color: lightgrey;
      background-color: #fff;
      border-radius: 50%;
      padding: 0.5em;
  `}

  ${(props) =>
    props.solid &&
    `
      background-color: ${`var(--color-${props.color || "primary"})`};
      color: #fff;
      border-color: ${`var(--color-${props.color || "primary"})`};
  `}

  ${(props) =>
    props.outlined &&
    `
      background-color: transparent;
      color: ${`var(--color-${props.color || "primary"})`};
      border: 1px solid var(--color-${props.color || "primary"});
  `}

  ${(props) =>
    props.small &&
    `
      padding: 0.3em;
  `}


  &:hover {
    background-color: ${(props) =>
      `var(--color-${props.color || "primary"}-light)`};

    ${(props) =>
      props.solid &&
      `
      background-color: ${`var(--color-${props.color || "primary"}-dark)`};
      border-color: ${`var(--color-${props.color || "primary"}-dark)`};
  `}

    ${(props) =>
      props.icon &&
      `
      color: white;
      background-color: ${`var(--color-${props.color || "primary"}-dark)`};
  `}

    ${(props) =>
      props.outlined &&
      `
      background-color: ${`var(--color-${props.color || "primary"}-light)`};
  `}
  }
`;

export const ButtonIcon = styled.img`
  height: 16px;
  filter: invert(47%) sepia(15%) saturate(1794%) hue-rotate(165deg)
    brightness(95%) contrast(80%);
  margin-right: 6px;
`;

export const ButtonBar = styled.div`
  display: flex;
  & > button:not(:first-child) {
    margin-left: 0.4em;
  }
`;
