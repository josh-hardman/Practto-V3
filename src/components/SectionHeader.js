import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";

const SectionHeader = styled.h2`
  color: ${props => (props.color ? props.color : theme.white)};
  font-weight: lighter;
  font-size: ${toRem(22)};
`;
export default SectionHeader;
