import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";

const ListingHeader = styled.h1`
  color: ${theme.white};
  font-weight: lighter;
  font-size: ${toRem(42)};
  text-transform: capitalize;
  margin: 0;
`;
export default ListingHeader;
