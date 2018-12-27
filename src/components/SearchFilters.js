import React from 'react'
import SelectFilter from '../components/SelectFilter'
import styled from 'styled-components'
import breakpoints from '../theme/breakpoints'
import { CircularProgress } from 'material-ui/Progress'

const FieldWrapper = styled.div`
  padding: 0 16px;
  width: 100%;

  @media screen and (min-width: ${breakpoints._480}) {
    width: 50%;
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
`

const FullWidth = styled.div`
  width: 100%;
`

const SearchFilters = ({
  loading,
  handleChange,
  service,
  services,
  city,
  cities,
  insurance,
  insurances
}) => (
  <FullWidth>
    {loading ? (
      <ProgressWrapper>
        <CircularProgress size={50} />
      </ProgressWrapper>
    ) : (
      <Wrapper>
        <FieldWrapper>
          <SelectFilter
            label='Service'
            suggestions={services}
            handleUpdate={handleChange}
            value={service}
          />
        </FieldWrapper>
        <FieldWrapper>
          <SelectFilter
            label='City'
            suggestions={cities}
            handleUpdate={handleChange}
            value={city}
          />
        </FieldWrapper>
        {/* <FieldWrapper>
          <SelectFilter
            label="Insurance"
            suggestions={insurances}
            handleUpdate={handleChange}
            value={insurance}
          />
        </FieldWrapper> */}
      </Wrapper>
    )}
  </FullWidth>
)

export default SearchFilters
