import React from 'react'
import SelectFilter from '../components/SelectFilter'
import styled from 'styled-components'
import breakpoints from '../theme/breakpoints'
import { CircularProgress } from 'material-ui/Progress'
import PropTypes from 'prop-types'

const DropDown = styled.div`
  padding: 0 16px;
  width: 100%;

  @media screen and (min-width: ${breakpoints._480}) {
    width: 25%;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const FullWidth = styled.div`width: 100%;`

const SearchFilters = ({ loading, handleChange, filters }) => {
  const { service, state, city, insurance } = filters
  return (
    <FullWidth>
      {loading
        ? <ProgressWrapper>
          <CircularProgress size={50} />
        </ProgressWrapper>
        : <Wrapper>
          <DropDown>
            <SelectFilter
              label='Service'
              suggestions={service.options}
              handleUpdate={handleChange}
              value={service.value}
              />
          </DropDown>
          <DropDown>
            <SelectFilter
              label='State'
              suggestions={state.options}
              handleUpdate={handleChange}
              value={state.value}
              />
          </DropDown>
          <DropDown>
            <SelectFilter
              label='City'
              suggestions={city.options}
              handleUpdate={handleChange}
              value={city.value}
              disabled={!state.value}
              />
          </DropDown>
          <DropDown>
            <SelectFilter
              label='Insurance'
              suggestions={insurance.options}
              handleUpdate={handleChange}
              value={insurance.value}
              />
          </DropDown>
        </Wrapper>}
    </FullWidth>
  )
}

SearchFilters.propTypes = {
  loading: PropTypes.bool,
  handleChange: PropTypes.func,
  filters: PropTypes.object
}

export default SearchFilters
