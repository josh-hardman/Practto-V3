import React from 'react'
import styled from 'styled-components'

const Square = styled.div`
  position: relative;
  width: ${props =>
    props.widthPercent
      ? `${props.widthPercent}%`
      : props.width
        ? `${props.width}px`
        : '100%'};
  overflow: hidden;
  z-index: 1;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

const StyledImg = styled.img`
  position: absolute;
  width: 100%;
`

const Avatar = ({ widthPercent, width, src }) => (
  <Square widthPercent={widthPercent} width={width}>
    <StyledImg src={src} />
  </Square>
)

export default Avatar
