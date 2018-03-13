import React, { Component } from 'react'
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
  handleGetPracticeTypes = () =>
    (this.props.data.allPracticeTypeses
      ? this.props.data.allPracticeTypeses.map(item => item.name)
      : [])

  handleGetLocations = () =>
    (this.props.data.allCities
      ? this.props.data.allCities.map(
          item => `${item.name}, ${item.state.postalCode}`
        )
      : [])

  handleGetInsurances = () =>
    (this.props.data.allInsurances
      ? this.props.data.allInsurances.map(item => item.name)
      : [])

  getFilteredPracticeTypes = data => {
    return data.filter(practice => {
      return (
        practice.practiceType
          .map(item => item.name)
          .includes(this.props.service) || this.props.service === ''
      )
    })
  }

  getFilteredLocations = data => {
    return data.filter(practice => {
      return (
        `${practice.city.name}, ${practice.city.state.postalCode}` ===
          this.props.city || this.props.city === ''
      )
    })
  }

  getFilteredInsurance = data => {
    return data.filter(practice => {
      return (
        practice.insurances
          .map(item => item.name)
          .includes(this.props.insurance) || this.props.insurance === ''
      )
    })
  }

  getFilteredPractices = () =>
    this.getFilteredInsurance(
      this.getFilteredLocations(
        this.getFilteredPracticeTypes(this.props.data.allPractices)
      )
    )

  render () {
    const { data, service, city, insurance, handleChange } = this.props

    return (
      <div>
        <Section background={theme.aliceBlue}>
          <Card background={theme.aliceBlue}>
            <FilterContainer>
              <SearchFilters
                handleChange={handleChange}
                service={service}
                services={this.handleGetPracticeTypes()}
                city={city}
                cities={this.handleGetLocations()}
                insurance={insurance}
                insurances={this.handleGetInsurances()}
              />
            </FilterContainer>
          </Card>
        </Section>
        <NumResults>
          {data.allPractices && this.getFilteredPractices().length
            ? `${this.getFilteredPractices().length} Practices Found`
            : 'Searching...'}
        </NumResults>
        <ResultsWrapper>
          <ResultsContainer>
            {data.loading
              ? <CenteredDiv>
                <CircularProgress size={50} />
              </CenteredDiv>
              : data.allPractices && this.getFilteredPractices().length > 0
                  ? this.getFilteredPractices().map((practice, i) => (
                    <ResultCard
                      key={i}
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
                      location={`${practice.city.name}, ${practice.city.state.postalCode}`}
                      inNetwork
                      numOffers={practice.specialOffers.length}
                      numReviews={practice.testimonials.length}
                      />
                    ))
                  : <ErrorText>
                      Sorry, we were unable to find any practices that matched your
                      search
                    </ErrorText>}
          </ResultsContainer>
        </ResultsWrapper>
      </div>
    )
  }
}

Search.propTypes = {
  data: PropTypes.object,
  service: PropTypes.string,
  city: PropTypes.string,
  insurance: PropTypes.string,
  handleChange: PropTypes.func
}

const query = gql`
  query {
    ${filterQuery}
    allPractices(orderBy: name_ASC) {
      name
      id
      hero {
        url
      }
      city {
        name
        state {
          name
          postalCode
        }
      }
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
