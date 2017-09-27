import React from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import { toRem } from '../utils/utils'

const Chip = styled.div`
	background: ${props =>
		props.background ? props.background : theme.lightGrey};
	border-radius: ${toRem(20)};
	font-size: ${toRem(14)};
	font-weight: normal;
	padding: ${toRem(2)} ${toRem(8)};
	margin: ${toRem(2)};

	&:hover {
		background-color: ${theme.mediumGrey};
		cursor: pointer;
	}

	&:active {
		background-color: ${theme.darkGrey};
	}
`

export default Chip
