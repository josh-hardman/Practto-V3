import React from 'react'
import styled from 'styled-components'
import breakpoints from '../theme/breakpoints'
import PropTypes from 'prop-types'

const PageColumnWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const PageColumnInner = styled.div`
    max-width: ${breakpoints._840};
    width: 100%;
`

const PageColumn = ({ children }) => (
  <PageColumnWrapper>
    <PageColumnInner>
      {children}
    </PageColumnInner>
  </PageColumnWrapper>
)

PageColumn.propTypes = {
  children: PropTypes.node
}

export default PageColumn
