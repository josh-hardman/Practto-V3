import React, { Component } from 'react'
import parser from 'parse-address'
import styled from 'styled-components'
import breakpoints from '../theme/breakpoints'
import theme from '../theme/theme'
import Section from '../layouts/Section'
import Card from '../components/Card'
import { gql, graphql } from 'react-apollo'
import ResultCard from '../components/ResultCard'
import filterQuery from '../queries/filters'
import SearchFilters from '../components/SearchFilters'
import { CircularProgress } from 'material-ui/Progress'
import { toRem } from '../utils/utils'
import PropTypes from 'prop-types'

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

const ErrorText = styled.span`
  color: ${theme.white};
  font-size: ${toRem(12)};
  font-weight: lighter;
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
  getSearchFieldValues = key =>
    (this.props.data[key] ? this.props.data[key].map(item => item.name) : [])

  // getFilteredPracticeTypes = data => {
  //   return data.filter(practice => {
  //     return (
  //       practice.practiceType
  //         .map(item => item.name)
  //         .includes(this.props.service) || this.props.service === ''
  //     )
  //   })
  // }

  // getFilteredLocations = data => {
  //   return data.filter(practice => {
  //     return (
  //       `${practice.city.name}, ${practice.city.state.postalCode}` ===
  //         this.props.city || this.props.city === ''
  //     )
  //   })
  // }

  // getFilteredInsurance = data => {
  //   return data.filter(practice => {
  //     return (
  //       practice.insurances
  //         .map(item => item.name)
  //         .includes(this.props.insurance) || this.props.insurance === ''
  //     )
  //   })
  // }

  // getFilteredPractices = () =>
  //   this.getFilteredInsurance(
  //     this.getFilteredLocations(
  //       this.getFilteredPracticeTypes(this.props.data.allPractices)
  //     )
  //   )

  getParsedAddressByKey = (key, addresses) => {
    const parsed = []

    addresses.forEach(address => {
      const parsedAddress = parser.parseAddress(address)

      if (parsedAddress) {
        !parsed.includes(parsedAddress[key]) && parsed.push(parsedAddress[key])
      }
    })

    return parsed
  }

  getCitiesByState = (state, addresses) => {
    if (!state) return []

    const cities = addresses.reduce((pAddresses, address) => {
      const pAddress = parser.parseAddress(address)

      if (
        pAddress &&
        pAddress.state === state &&
        !pAddresses.includes(pAddress.city)
      ) {
        return [...pAddresses, pAddress.city]
      }

      return pAddresses
    }, [])

    const sortedCities = cities.sort()

    return sortedCities
  }

  filterPractices = (filters, practices) => {
    // services

    // state

    // city

    // insurance

    return practices
  }

  render () {
    const {
      data,
      loading,
      service,
      insurance,
      city,
      state,
      handleChange
    } = this.props

    const practices = data.allPractices || []

    // Parse out cities and states from practice address
    const addresses = practices.map(practice => practice.address)
    const states = this.getParsedAddressByKey('state', addresses)
    const cities = this.getCitiesByState(state, addresses)

    // Filter results based on filters
    const filters = {
      service,
      state,
      city,
      insurance
    }
    const searchResults = this.filterPractices(filters, practices)

    return (
      <div>
        <Section background={theme.aliceBlue}>
          <Card background={theme.aliceBlue}>
            <FilterContainer>
              <SearchFilters
                handleChange={handleChange}
                service={service}
                services={this.getSearchFieldValues('allPracticeTypeses')}
                city={city}
                cities={cities}
                state={state}
                states={states}
                insurance={insurance}
                insurances={this.getSearchFieldValues('allInsurances')}
              />
            </FilterContainer>
          </Card>
        </Section>
        <NumResults>
          {loading ? 'Searching...' : `${searchResults.length} Practices Found`}
        </NumResults>
        <ResultsWrapper>
          <ResultsContainer>
            {data.loading
              ? <CenteredDiv>
                <CircularProgress size={50} />
              </CenteredDiv>
              : searchResults &&
                  searchResults.map((practice, i) => (
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
                      city={`zzzzzzzzzzzzz`}
                      inNetwork
                      numOffers={practice.specialOffers.length}
                      numReviews={practice.testimonials.length}
                    />
                  ))}
          </ResultsContainer>
          {/* : <ErrorText>
                      Sorry, we were unable to find any practices that matched your
                      search
                    </ErrorText> */}
        </ResultsWrapper>
      </div>
    )
  }
}

Search.propTypes = {
  data: PropTypes.object,
  service: PropTypes.string,
  loading: PropTypes.bool,
  insurance: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  address: PropTypes.string,
  handleChange: PropTypes.func
}

const query = gql`
  query {
    ${filterQuery}
    allPractices(orderBy: name_ASC) {
      name
      id
      isMember
      hero {
        url
      }
      address
      practiceType(orderBy: name_ASC) {
        name
      }
      specialOffers(orderBy: name_ASC) {
        id
      }
      testimonials(orderBy: name_ASC) {
        id
      }
      insurances(orderBy: name_ASC) {
        name
      }
    }
  }
`

export default graphql(query)(Search)
