import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";

const ListingHeader = styled.h1`
  color: ${theme.white};
  font-weight: normal;
  font-size: ${toRem(32)};
  text-transform: capitalize;
`;
export default ListingHeader;
