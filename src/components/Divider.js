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
	padding-top: ${toRem(18)};
	padding-bottom: ${toRem(32)};
`

const Divider = ({ color }) => (
	<StyledDivider>
		<Line color={color} />
	</StyledDivider>
)

export default Divider
