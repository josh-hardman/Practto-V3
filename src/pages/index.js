import React, { Component } from "react";
import styled from "styled-components";
import { toRem } from "../utils/utils";
import theme from "../theme/theme";
import Section from "../layouts/Section";
import Typing from "react-typing-animation";
import Card from "../components/Card";
import RaisedButton from "material-ui/RaisedButton";
import AutoComplete from "material-ui/AutoComplete";
import { gql, graphql } from "react-apollo";
import { Link } from "react-router-dom";
import filterQuery from "../queries/filters";
// const Background = styled.div`
//   background: ${theme.mediumBlue};
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   z-index: -2;
// `;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  padding-bottom: 120px;
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
          <Lede>Find Your Family</Lede>
          <PracticeType>Dentist</PracticeType>
        </Section>
        <Section background={theme.mediumBlue} zIndex={-2} squareBottom>
          <Question>What can we help you find today?</Question>
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
          <ButtonContainer>
            <Link to="/search">
              <RaisedButton
                label="Search"
                labelStyle={{ textTransform: "none", fontWeight: "lighter" }}
                labelColor={theme.white}
                backgroundColor={theme.orange}
              />
            </Link>
          </ButtonContainer>
        </Section>
      </div>
    );
  }
}

const query = gql`query{
  ${filterQuery}
}`;

export default graphql(query)(Landing);
