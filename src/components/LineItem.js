import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";

const StyledLineItem = styled.a`
  color: ${props =>
    props.href ? theme.link : props.color ? props.color : theme.black};
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    color: ${props => props.href && theme.lightBlue};
    pointer: ${props => props.href && "cursor"};
  }
`;

const LineItem = ({ href, target, color, children }) => (
  <li>
    <StyledLineItem href={href} target={target} color={color}>
      {children}
    </StyledLineItem>
  </li>
);

export default LineItem;
