import React from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import { toRem } from '../utils/utils'

const StyledCard = styled.div`
	background: ${props => (props.background ? props.background : 'white')};
	box-shadow: ${theme.dropShadow};
	padding: ${toRem(18)};
	border-radius: 5px;
	position: relative;
`

export default StyledCard
