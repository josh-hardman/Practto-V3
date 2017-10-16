import React, { Component } from "react";
import styled from "styled-components";
import { toRem } from "../utils/utils";
import theme from "../theme/theme";
import Section from "../layouts/Section";
import Typing from "react-typing-animation";
import Card from "../components/Card";
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import SelectFilter from '../components/SelectFilter'
import Button from 'material-ui/Button';


// import AutoComplete from "material-ui/AutoComplete";
import { gql, graphql } from "react-apollo";
import { Link } from "react-router-dom";
import filterQuery from "../queries/filters";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});



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
  padding-right: 8px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

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
              <SelectFilter label="Service" suggestions={this.handleGetPracticeTypes()} handleUpdate={handleChange} value={service} />
              <SelectFilter label="City" suggestions={this.handleGetLocation()} handleUpdate={handleChange} value={city} />
              <SelectFilter label="Insurance" suggestions={this.handleGetInsurances()} handleUpdate={handleChange} value={insurance} />
            </FilterContainer>
            <ButtonContainer>
              <Link to="/search">
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
