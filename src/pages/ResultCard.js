import React from "react";
import styled from "styled-components";
import ResultCard from "../components/ResultCard";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const ResultCardRenderer = () => (
  <Wrapper>
    <ResultCard />
  </Wrapper>
);

export default ResultCardRenderer;
