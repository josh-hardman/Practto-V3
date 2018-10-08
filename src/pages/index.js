import React, { Component } from 'react'
import styled from 'styled-components'
import { toRem } from '../utils/utils'
import theme from '../theme/theme'
import Section from '../layouts/Section'
import Card from '../components/Card'
import Button from 'material-ui/Button'
import SearchFilters from '../components/SearchFilters'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import filterQuery from '../queries/filters'
import breakpoints from '../theme/breakpoints'
import PropTypes from 'prop-types'

const Lede = styled.h1`
  font-size: ${toRem(22)};
  text-align: center;
  color: ${theme.textBlack};
  font-weight: lighter;
  position: absolute;
  width: 50%;
  left: 2%;
  top: 20%;
  padding: ${toRem(8)};

  @media screen and (min-width: ${breakpoints._600}) {
    font-size: ${toRem(28)};
    left: 8%;
  }
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  padding-right: 8px;
`

const Background = styled.img`
  right: 0;
  height: 35vh;
  position: absolute;
  background: ${theme.aliceBlue};
`

const Backdrop = styled.div`
  width: 100%;
  height: 35vh;
  position: relative;
  overflow: hidden;
  margin-bottom: ${toRem(16)};
`

class Landing extends Component {
  onHeaderTyped = () => {
    this.setState({
      index: 1
    })
  }

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

  render () {
    const { data, service, city, insurance, handleChange } = this.props

    return (
      <div>
        <Section
          style={{ overflow: 'hidden', padding: 0 }}
          background={theme.aliceBlue}
        >
          <Backdrop>
            <Background src='landing.png' />
            <Lede>Practto connects you with a Dentist you can trust!</Lede>
          </Backdrop>
          <Card background={theme.aliceBlue}>
            <FilterContainer>
              <SearchFilters
                loading={data.loading}
                handleChange={handleChange}
                service={service}
                services={this.handleGetPracticeTypes()}
                city={city}
                cities={this.handleGetLocations()}
                insurance={insurance}
                insurances={this.handleGetInsurances()}
              />
            </FilterContainer>
            <ButtonContainer>
              <Link style={{ textDecoration: 'none' }} to='/search'>
                <Button raised='true' color='primary'>
                  Search
                </Button>
              </Link>
            </ButtonContainer>
          </Card>
        </Section>
      </div>
    )
  }
}

Landing.propTypes = {
  data: PropTypes.object,
  service: PropTypes.string,
  city: PropTypes.string,
  insurance: PropTypes.string,
  handleChange: PropTypes.func
}

const query = gql`query{
  ${filterQuery}
}`

export default graphql(query)(Landing)
