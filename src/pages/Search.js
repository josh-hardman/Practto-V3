import React, { Component } from "react";
import styled from "styled-components";
import { toRem, removeDash, addDash } from "../utils/utils";
import breakpoints from "../theme/breakpoints";
import theme from "../theme/theme";
import Section from "../layouts/Section";
import Typing from "react-typing-animation";
import Card from "../components/Card";
import RaisedButton from "material-ui/RaisedButton";
import AutoComplete from "material-ui/AutoComplete";
import { gql, graphql } from "react-apollo";
import ResultCard from "../components/ResultCard";
import filterQuery from "../queries/filters";
import PageColumn from '../components/PageColumn'

const ResultsContainer = styled.div`
  width: ${breakpoints._840};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (min-width: ${breakpoints._840}) {
    justify-content: flex-start;
    
  }
`;

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`

class Search extends Component {
  handleGetPracticeTypes = () =>
    this.props.data.allPracticeTypeses
      ? this.props.data.allPracticeTypeses.map(item => item.name)
      : [];

  handleGetLocation = () =>
    this.props.data.allCities
      ? this.props.data.allCities.map(
        item => `${item.name}, ${item.state.postalCode}`
      )
      : [];

  handleGetInsurances = () =>
    this.props.data.allInsurances
      ? this.props.data.allInsurances.map(item => item.name)
      : [];

  getFilteredPracticeTypes = (data) => {
    return data.filter(
      practice => {
        return (
          practice.practiceType.map(item => item.name).includes(this.props.practiceType)
          || '' === this.props.practiceType
        )
      }
    );
  };

  getFilteredLocations = (data) => {
    return data.filter(
      practice => {
        return (
          `${practice.city.name}, ${practice.city.state.postalCode}` ===
          this.props.city || '' === this.props.city
        )
      }
    );
  };

  getFilteredInsurance = (data) => {
    return data.filter(
      practice => {
        return (
          practice.insurances.map(item => item.name).includes(this.props.insurance)
          || '' === this.props.insurance
        )
      }
    );
  };

  getFilteredPractices = () => this.getFilteredInsurance(this.getFilteredLocations(this.getFilteredPracticeTypes(this.props.data.allPractices)))

  render() {
    const {
      data,
      practiceType,
      city,
      insurance,
      handleUpdatePracticeType,
      handleUpdateCity,
      handleUpdateInsurance
    } = this.props;

    console.log(data)

    return (
      <div>
        <Section background={theme.lightBlue}>
          <Card background={theme.aliceBlue}>
            <AutoComplete
              fullWidth
              floatingLabelFixed={true}
              floatingLabelText="Practice Type"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.handleGetPracticeTypes()}
              maxSearchResults={5}
              disabled={!this.handleGetPracticeTypes().length}
              searchText={practiceType}
              onUpdateInput={handleUpdatePracticeType}
            />
            <AutoComplete
              fullWidth
              floatingLabelFixed={true}
              floatingLabelText="City"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.handleGetLocation()}
              maxSearchResults={5}
              disabled={!this.handleGetLocation().length}
              searchText={city}
              onUpdateInput={handleUpdateCity}
            />
            <AutoComplete
              fullWidth
              floatingLabelFixed={true}
              floatingLabelText="Insurance Provider"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.handleGetInsurances()}
              maxSearchResults={5}
              disabled={!this.handleGetInsurances().length}
              searchText={insurance}
              onUpdateInput={handleUpdateInsurance}
            />
          </Card>
        </Section>
        <ResultsWrapper>
          <ResultsContainer>
            {data.allPractices &&
              this.getFilteredPractices().map((practice, i) => (
                <ResultCard
                  key={i}
                  id={practice.id}
                  name={practice.name}
                  url={practice.hero && practice.hero.url}
                  practiceType={
                    practice.practiceType.length > 1 ? (
                      "Multiple Types"
                    ) : practice.practiceType[0] ? (
                      practice.practiceType[0].name
                    ) : (
                          ""
                        )
                  }
                  location={`${practice.city.name}, ${practice.city.state
                    .postalCode}`}
                  inNetwork={true}
                  numOffers={practice.specialOffers.length}
                  numReviews={practice.testimonials.length}
                />
              ))}

          </ResultsContainer>
        </ResultsWrapper>
      </div>
    );
  }
}

const query = gql`
  query {
    ${filterQuery}
    allPractices {
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
      practiceType {
        name
      }
      specialOffers {
        id
      }
      testimonials {
        id
      }
      insurances {
        name
      }
    }
  }
`;

export default graphql(query)(Search);
