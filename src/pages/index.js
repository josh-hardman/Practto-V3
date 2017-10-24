import React, { Component } from "react";
import styled from "styled-components";
import { toRem } from "../utils/utils";
import theme from "../theme/theme";
import Section from "../layouts/Section";
import Card from "../components/Card";
import Button from 'material-ui/Button';
import SearchFilters from '../components/SearchFilters'
import { gql, graphql } from "react-apollo";
import { Link } from "react-router-dom";
import filterQuery from "../queries/filters";

const Lede = styled.h1`
  font-size: ${toRem(33)};
  text-align: center;
  color: ${theme.white};
  font-weight: normal;
`;

const PracticeType = styled.h1`
  width: 100%;
  font-size: ${toRem(40)};
  text-align: center;
  color: ${theme.darkBlue};
  font-weight: normal;
`;

const Question = styled.p`
  color: ${theme.white};
  font-weight: lighter;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  padding-right: 8px;
`;

class Landing extends Component {
  state = {
    words: ["Dentist", "Chiropractor", "Lawyer"],
    index: 0,
    type: "Hello WORLD"
  };

  onHeaderTyped = () => {
    this.setState({
      index: 1
    });
  };

  handleGetPracticeTypes = () =>
    this.props.data.allPracticeTypeses
      ? this.props.data.allPracticeTypeses.map(item => item.name)
      : [];

  handleGetLocations = () =>
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
    const {
      data,
      service,
      city,
      insurance,
      handleChange
    } = this.props;
    return (
      <div>
        <Section background={theme.lightBlue}>
          <Lede>Find Your Family</Lede>
          <PracticeType>Dentist</PracticeType>
        </Section>
        <Section background={theme.mediumBlue} zIndex={-2} squareBottom>
          <Question>What can we help you find today?</Question>
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
            <ButtonContainer>
              <Link style={{ textDecoration: 'none' }} to="/search">
                <Button raised color='primary'>Search</Button>
              </Link>
            </ButtonContainer>
          </Card>
        </Section>
      </div>
    );
  }
}

const query = gql`query{
  ${filterQuery}
}`;

export default graphql(query)(Landing);
