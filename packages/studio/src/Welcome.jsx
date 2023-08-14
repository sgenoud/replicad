import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Main = styled.div`
  width: 100%;
  min-height: 100%;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2em;
  background: var(--color-primary-dark);
  background: linear-gradient(
    351deg,
    var(--color-primary-dark) 0%,
    var(--color-primary) 95%
  );
  color: white;
`;

const Title = styled.h1`
  padding: 0;
  margin: 0;
  margin-bottom: 0.5em;
  font-size: 1.8em;
  font-weight: lighter;
`;

const ItemsList = styled.div`
  display: flex;
  margin: 1em;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const BoxCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0.6em;
  padding: 1em;
  width: ${(props) => (props.large ? "500px" : "300px")};
  border: 1px var(--color-primary) solid;
  border-radius: 3px;
  text-decoration: none;
  color: inherit;

  &: hover {
    background-color: var(--color-primary-light);
  }
`;

const BoxTitle = styled.div`
  font-size: 1.2em;
`;

const Description = styled.div`
  font-weight: lighter;
  margin: 0.3em 0;
`;

const Visualiser = styled.div`
  margin: auto;
  max-width: 600px;
`;

const Body = styled.div`
  padding: 2em;
`;

export default function Welcome() {
  return (
    <Main>
      <Hero>
        <Title>Welcome to the replicad studio</Title>
        <div>Build and share canned models for 3D printing</div>
      </Hero>
      <Body>
        <ItemsList>
          <BoxCard large to="workbench">
            <BoxTitle>Workbench</BoxTitle>
            <Description>Build your model in an online editor</Description>
          </BoxCard>
          <BoxCard large to="visualiser">
            <BoxTitle>Visualiser</BoxTitle>
            <Description>Build and visualise your own model</Description>
          </BoxCard>
        </ItemsList>
      </Body>
    </Main>
  );
}
