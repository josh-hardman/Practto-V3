import React, { Component } from 'react'
import styled from 'styled-components'
import breakpoints from '../theme/breakpoints'
import theme from '../theme/theme'
import Section from '../layouts/Section'
import Card from '../components/Card'
import ResultCard from '../components/ResultCard'
import SearchFilters from '../components/SearchFilters'
import { CircularProgress } from 'material-ui/Progress'
import { toRem } from '../utils/utils'
import PropTypes from 'prop-types'
import parser from 'parse-address'

const ResultsContainer = styled.div`
  width: ${breakpoints._840};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (min-width: ${breakpoints._840}) {
    justify-content: flex-start;
  }
`

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const NumResults = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${theme.white};
  font-size: ${toRem(12)};
  font-weight: lighter;
  padding: ${toRem(12)};
`

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

class Search extends Component {
  filterPractices = (filters, practices) => {
    return practices
  }

  render () {
    const { loading, filters, searchResults, handleChange } = this.props

    return (
      <div>
        <Section background={theme.aliceBlue}>
          <Card background={theme.aliceBlue}>
            <FilterContainer>
              <SearchFilters handleChange={handleChange} filters={filters} />
            </FilterContainer>
          </Card>
        </Section>
        <NumResults>
          {loading ? 'Searching...' : `${searchResults.length} Practices Found`}
        </NumResults>
        <ResultsWrapper>
          <ResultsContainer>
            {loading
              ? <CenteredDiv>
                <CircularProgress size={50} />
              </CenteredDiv>
              : searchResults &&
                  searchResults.map((practice, i) => {
                    const address = parser.parseAddress(practice.address) || ''

                    return (
                      <ResultCard
                        key={i}
                        isMember={practice.isMember}
                        id={practice.id}
                        name={practice.name}
                        url={practice.hero && practice.hero.url}
                        practiceType={
                          practice.practiceType.length > 1
                            ? 'Multiple Types'
                            : practice.practiceType[0]
                                ? practice.practiceType[0].name
                                : ''
                        }
                        city={address.city}
                        inNetwork
                        numOffers={practice.specialOffers.length}
                        numReviews={practice.testimonials.length}
                      />
                    )
                  })}
          </ResultsContainer>
        </ResultsWrapper>
      </div>
    )
  }
}

Search.propTypes = {
  loading: PropTypes.bool,
  address: PropTypes.string,
  handleChange: PropTypes.func,
  filters: PropTypes.object,
  searchResults: PropTypes.array
}

export default Search
