import React, { Component } from "react";
import styled from "styled-components";
import breakpoints from "../theme/breakpoints";
import theme from "../theme/theme";
import Section from "../layouts/Section";
import Card from "../components/Card";
import { gql, graphql } from "react-apollo";
import ResultCard from "../components/ResultCard";
import filterQuery from "../queries/filters";
import SearchFilters from "../components/SearchFilters";
import { CircularProgress } from "material-ui/Progress";
import { toRem, capitalizeFirstLetter } from "../utils/utils";
import queryString from "query-string";

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
  margin-top: 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorText = styled.span`
  color: ${theme.white};
  font-size: ${toRem(12)};
  font-weight: lighter;
`;

const NumResults = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${theme.white};
  font-size: ${toRem(12)};
  font-weight: lighter;
  padding: ${toRem(12)};
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Explanation = styled.h3`
  color: ${theme.textBlack};
  font-size: ${toRem(16)};
  font-weight: lighter;
  width: 100%;
  text-align: center;
  padding-left: ${toRem(12)};
  padding-right: ${toRem(12)};
`;

class State extends Component {
  render() {
    const { data, loading, location } = this.props;

    return (
      <div>
        <Section background={theme.aliceBlue}>
          <Explanation
          >{`These are our the highest rated practices in the state of ${capitalizeFirstLetter(
            queryString.parse(location.search).state
          )}`}</Explanation>
        </Section>

        {!data.allPractices ? (
          <CenteredDiv>
            <CircularProgress size={50} />
          </CenteredDiv>
        ) : (
          <div>
            <NumResults>{data.allPractices.length} Practices Found</NumResults>
            <ResultsWrapper>
              <ResultsContainer>
                {data.loading ? (
                  <CenteredDiv>
                    <CircularProgress size={50} />
                  </CenteredDiv>
                ) : data.allPractices.length > 0 ? (
                  data.allPractices.map((practice, i) => (
                    <ResultCard
                      key={i}
                      id={practice.id}
                      name={practice.name}
                      url={practice.hero && practice.hero.url}
                      practiceType={
                        practice.practiceType.length > 1
                          ? "Multiple Types"
                          : practice.practiceType[0]
                            ? practice.practiceType[0].name
                            : ""
                      }
                      location={`${practice.city.name}, ${practice.city.state
                        .postalCode}`}
                      inNetwork={true}
                      numOffers={practice.specialOffers.length}
                      numReviews={practice.testimonials.length}
                    />
                  ))
                ) : (
                  <ErrorText>
                    Sorry, we were unable to find any practices that matched
                    your search
                  </ErrorText>
                )}
              </ResultsContainer>
            </ResultsWrapper>
          </div>
        )}
      </div>
    );
  }
}

const Query = gql`
  query($state: String) {
    allPractices(
      filter: { city: { state: { name: $state } } }
      orderBy: name_ASC
    ) {
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

const PracticeQuery = graphql(Query, {
  options: props => ({
    variables: {
      state: queryString.parse(props.location.search).state
    }
  })
})(State);

export default PracticeQuery;
