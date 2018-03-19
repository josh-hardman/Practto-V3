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

const SearchFilters = ({
  loading,
  handleChange,
  service,
  services,
  states,
  state,
  city,
  cities,
  insurance,
  insurances
}) => (
  <FullWidth>
    {loading
      ? <ProgressWrapper>
        <CircularProgress size={50} />
      </ProgressWrapper>
      : <Wrapper>
        <DropDown>
          <SelectFilter
            label='Service'
            suggestions={services}
            handleUpdate={handleChange}
            value={service}
            />
        </DropDown>
        <DropDown>
          <SelectFilter
            label='State'
            suggestions={states}
            handleUpdate={handleChange}
            value={state}
            />
        </DropDown>
        <DropDown>
          <SelectFilter
            label='City'
            suggestions={cities}
            handleUpdate={handleChange}
            value={city}
            disabled={!state}
            />
        </DropDown>
        <DropDown>
          <SelectFilter
            label='Insurance'
            suggestions={insurances}
            handleUpdate={handleChange}
            value={insurance}
            />
        </DropDown>
      </Wrapper>}
  </FullWidth>
)

SearchFilters.propTypes = {
  loading: PropTypes.bool,
  handleChange: PropTypes.func,
  service: PropTypes.string,
  services: PropTypes.array,
  city: PropTypes.string,
  state: PropTypes.string,
  states: PropTypes.array,
  cities: PropTypes.array,
  insurance: PropTypes.string,
  insurances: PropTypes.array
}

export default SearchFilters
