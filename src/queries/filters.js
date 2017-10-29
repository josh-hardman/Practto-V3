export default `
  allPracticeTypeses(orderBy: name_ASC) {
    name
  }
  allCities(orderBy: name_ASC) {
    name
    state {
      postalCode
    }
  }
  allInsurances(orderBy: name_ASC) {
    name
  }
  allStates(orderBy: name_ASC) {
    name
  }
`;
