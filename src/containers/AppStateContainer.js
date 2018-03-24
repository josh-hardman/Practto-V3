import React, { Component } from 'react'
import '../index.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from '../pages/index'
import About from '../pages/About'
import Listing from '../pages/listing'
import Contact from '../pages/Contact'
import Search from '../pages/Search'
import { gql, graphql } from 'react-apollo'
import filterQuery from '../queries/filters'

import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'
import ScrollToTop from '../components/ScrollToTop'
import styled from 'styled-components'
import parser from 'parse-address'
import geolocator from 'geolocator'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
`

class AppStateContainer extends Component {
  state = {
    service: '',
    state: '',
    city: '',
    insurance: '',
    userLocation: {}
  }

  componentWillMount () {
    const options = {
      google: {
        version: '3',
        key: 'AIzaSyAYnj5zp2C8B8w8F0owP8ueAqArH5LDbzQ'
      },
      enableHighAccuracy: false,
      fallbackToIP: false, // fallback to IP if Geolocation fails or rejected
      addressLookup: false
    }

    geolocator.locateByIP(
      options,
      function (err, location) {
        this.setState({
          state: location.address.state
        })
      }.bind(this)
    )
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

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

  filterService = (service, practices) => {
    if (service) {
      return practices.filter(practice => {
        const practiceTypes = practice.practiceType.map(type => type.name)
        return practiceTypes.includes(service)
      })
    } else {
      return practices
    }
  }

  filterState = (state, practices) => {
    if (state) {
      return practices.filter(practice => {
        const parsedAddress = parser.parseAddress(practice.address)
        return parsedAddress && parsedAddress.state === state
      })
    } else {
      return practices
    }
  }

  filterCity = (city, practices) => {
    if (city) {
      return practices.filter(practice => {
        const parsedAddress = parser.parseAddress(practice.address)
        return parsedAddress && parsedAddress.city === city
      })
    } else {
      return practices
    }
  }

  filterInsurance = (insurance, practices) => {
    if (insurance) {
      return practices.filter(practice => {
        const insurances = practice.insurances.map(insurance => insurance.name)
        return insurances.includes(insurance)
      })
    } else {
      return practices
    }
  }

  filterPractices = (filters, practices) => {
    const { service, state, city, insurance } = filters
    let filtered = [...practices]

    filtered = this.filterService(service.value, filtered)
    filtered = this.filterState(state.value, filtered)
    filtered = this.filterCity(city.value, filtered)
    filtered = this.filterInsurance(insurance.value, filtered)
    return filtered
  }

  sortPractices = practices => {
    const sortByPracticeName = (a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    }

    const sortByPriority = (a, b) => {
      if (!a.priority || !b.priority) {
        return 1
      } else {
        return a.priority - b.priority
      }
    }

    let members = []
    let nonMembers = []

    practices.forEach(practice => {
      if (practice.isMember) {
        members.push(practice)
      } else {
        nonMembers.push(practice)
      }
    })

    const sorted = [
      ...members.sort(sortByPriority),
      ...nonMembers.sort(sortByPracticeName)
    ]

    return sorted
  }

  render () {
    const { service, state, city, insurance } = this.state

    const { data } = this.props

    const practices = data.allPractices || []

    // Parse out cities and states from practice address
    const addresses = practices.map(practice => practice.address)
    const states = this.getParsedAddressByKey('state', addresses)
    const cities = this.getCitiesByState(state, addresses)

    // Format types from GraphCMS
    const services = data.allPracticeTypeses
      ? data.allPracticeTypeses.map(type => type.name)
      : []
    const insurances = data.allInsurances
      ? data.allInsurances.map(insurance => insurance.name)
      : []

    const filters = {
      service: {
        value: service,
        options: services
      },
      state: {
        value: state,
        options: states
      },
      city: {
        value: cities.includes(city) ? city : '',
        options: cities
      },
      insurance: {
        value: insurance,
        options: insurances
      }
    }

    let searchResults = []
    searchResults = this.filterPractices(filters, practices)
    searchResults = this.sortPractices(searchResults)

    return (
      <BrowserRouter>
        <ScrollToTop>
          <Wrapper>
            <Header />
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <Landing filters={filters} handleChange={this.handleChange} />
                )}
              />
              <Route
                exact
                path='/search'
                render={() => (
                  <Search
                    filters={filters}
                    handleChange={this.handleChange}
                    loading={data.loading}
                    searchResults={searchResults}
                  />
                )}
              />
              <Route
                path='/listing'
                render={({ location }) => (
                  <Listing
                    location={location}
                    insurance={insurance}
                    handleChange={this.handleChange}
                  />
                )}
              />
              <Route path='/about' render={() => <About />} />
              <Route path='/contact' render={() => <Contact />} />
            </Switch>
            <Footer />
          </Wrapper>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

AppStateContainer.propTypes = {
  data: PropTypes.object
}

const query = gql`
  query {
    ${filterQuery}
    allPractices(orderBy: name_ASC) {
      name
      id
      isMember
      priority
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

export default graphql(query)(AppStateContainer)
