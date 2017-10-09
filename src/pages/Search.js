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
import { Link } from "react-router-dom";
import filterQuery from "../queries/filters";

const ResultsContainer = styled.div`max-width: ${breakpoints._840};`;

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

    return (
      <div>
        <Section background={theme.lightBlue}>
          <Card background={theme.aliceBlue}>
            <AutoComplete
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
        <ResultsContainer>
          {data.allPractices &&
            this.getFilteredPractices().map((practice, i) => (
              <Link
                key={i}
                to={`/listing?practice=${practice.id}`}
                style={{ textDecoration: "none" }}
              >
                <ResultCard
                  name={practice.name}
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
              </Link>
            ))}
        </ResultsContainer>
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
      hero {
        url
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

console.log(query);

export default graphql(query)(Search);
