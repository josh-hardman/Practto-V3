import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";

const StyledLineItem = styled.a`
  color: ${props =>
    props.href ? theme.link : props.color ? props.color : theme.black};
  display: flex;
  font-size: ${props => props.fontSize && toRem(props.fontSize)};
  align-items: center;
  text-decoration: none;
  font-weight: lighter;

  &:hover {
    color: ${props => props.href && theme.lightBlue};
    pointer: ${props => props.href && "cursor"};
  }
`;

const ListItem = styled.li`
  margin: ${props => (props.margin ? `${props.margin}px` : "0px")};
`;

const LineItem = ({ href, target, color, children, margin, fontSize }) => (
  <ListItem margin={margin}>
    <StyledLineItem
      href={href}
      target={target}
      color={color}
      fontSize={fontSize}
    >
      {children}
    </StyledLineItem>
  </ListItem>
);

export default LineItem;
