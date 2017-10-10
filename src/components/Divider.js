import React from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import { toRem } from '../utils/utils'

const Line = styled.div`
	height: 10px;
	border-bottom: 1px solid
		${props => (props.color ? props.color : theme.lightBlue)};
	width: 50%;
`

const StyledDivider = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: ${props => props.paddingTop ? toRem(props.paddingTop) : toRem(18)};
	padding-bottom: ${props => props.paddingBottom ? toRem(props.paddingBottom) : toRem(32)};
`

const Divider = ({ color, paddingTop, paddingBottom }) => (
	<StyledDivider paddingTop={paddingTop} paddingBottom={paddingBottom}>
		<Line color={color} />
	</StyledDivider>
)

export default Divider
