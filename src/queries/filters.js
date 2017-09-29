import { gql } from "react-apollo";

export default gql`
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
  }
`;
