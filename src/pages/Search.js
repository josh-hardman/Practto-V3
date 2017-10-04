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

  render() {
    const { data } = this.props;
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
            />
            <AutoComplete
              floatingLabelFixed={true}
              floatingLabelText="City"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.handleGetLocation()}
              maxSearchResults={5}
              disabled={!this.handleGetLocation().length}
            />
            <AutoComplete
              floatingLabelFixed={true}
              floatingLabelText="Insurance Provider"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.handleGetInsurances()}
              maxSearchResults={5}
              disabled={!this.handleGetInsurances().length}
            />
          </Card>
        </Section>
        <ResultsContainer>
          {data.allPractices &&
            data.allPractices.map((practice, i) => (
              <Link
                key={i}
                to={`/listing?practice=${addDash(practice.name)}`}
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
                    .name} `}
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
      city {
        name
        state {
          name
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
