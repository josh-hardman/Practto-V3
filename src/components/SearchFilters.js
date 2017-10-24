import React from "react";
import SelectFilter from '../components/SelectFilter'
import styled from 'styled-components'
import breakpoints from "../theme/breakpoints";

const FieldWrapper = styled.div`
    padding: 0 16px;
    width: 100%;

    @media screen and (min-width: ${breakpoints._480}) {
        width: 33%; 
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SearchFilters = ({ handleChange, service, services, city, cities, insurance, insurances }) =>
    <Wrapper>
        <FieldWrapper>
            <SelectFilter label="Service" suggestions={services} handleUpdate={handleChange} value={service} />
        </FieldWrapper>
        <FieldWrapper>
            <SelectFilter label="City" suggestions={cities} handleUpdate={handleChange} value={city} />
        </FieldWrapper>
        <FieldWrapper>
            <SelectFilter label="Insurance" suggestions={insurances} handleUpdate={handleChange} value={insurance} />
        </FieldWrapper>
    </Wrapper>

export default SearchFilters