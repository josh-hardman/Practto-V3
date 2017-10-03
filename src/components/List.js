import React from "react";
import styled from "styled-components";
import { toRem } from "../utils/utils";

const List = styled.ul`
  margin: 0;
  padding: 0 ${props => (!props.padding ? 0 : toRem(18))};
  list-style: none;
  line-height: ${toRem(18)};
`;

export default List;
