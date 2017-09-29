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

class Search extends Component {
  handleGetPracticeTypes = () =>
    this.props.data.allPracticeTypeses
      ? this.props.data.allPracticeTypeses.map(item => item.name)
      : [];

  handleGetLocation = () =>
    this.props.data.allPractices
      ? this.props.data.allPractices.map(
          item => `${item.city.name}, ${item.state.name}`
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
        <Section background={theme.mediumBlue} zIndex={-2} squareBottom />
      </div>
    );
  }
}

const query = gql`
  query {
    allPracticeTypeses {
      name
    }
    allPractices {
      city {
        name
      }
      state {
        name
      }
    }
    allInsurances {
      name
    }
    allPractices {
      name
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

export default graphql(query)(Search);
