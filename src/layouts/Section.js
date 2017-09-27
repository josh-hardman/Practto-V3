import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { toRem } from '../utils/utils'

const StyledSection = styled.div`
	width: 100%;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		top: -200px;
		bottom: ${toRem(20)};
		background: ${props => props.background};
		transform: skewY(5deg);
		box-shadow: ${toRem(2)} ${toRem(2)} ${toRem(40)}
			${props => props.theme.shadow};
		z-index: ${props => (props.index ? props.index : -1)};
	}

	&::after {
		content: '';
		position: absolute;
		width: 100%;
		top: -200px;
		bottom: ${props => props.squareBottom && `-${toRem(20)}`};
		height: ${props => (props.squareBottom ? 'auto' : '100%')};
		background: ${props => props.background};
		z-index: ${props => (props.index ? props.index : -1)};
	}
`

const Padding = styled.div`
	margin: 0 auto;
	max-width: 960px;
	padding: 0 ${toRem(12)};
	padding-bottom: ${props => (props.squareBottom ? toRem(20) : toRem(60))};
	padding-top: ${toRem(18)};
`

const Section = ({ children, background, zIndex, squareBottom }) => (
	<StyledSection
		background={background}
		index={zIndex}
		squareBottom={squareBottom}
	>
		<Padding squareBottom={squareBottom}>{children}</Padding>
	</StyledSection>
)

Section.propTypes = {
	children: PropTypes.node,
	background: PropTypes.string,
	zIndex: PropTypes.number,
	square: PropTypes.bool
}

export default Section
