import React from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import { toRem } from '../utils/utils'

const Avatar = styled.img`
	width: auto;
	height: ${props => (props.height ? `${props.height}px` : '250px')};
	border-radius: 100%;
	margin: 0;
	z-index: 1;
`

export default Avatar
