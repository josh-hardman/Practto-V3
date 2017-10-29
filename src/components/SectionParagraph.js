import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";

const SectionParagraph = styled.p`
  color: ${props => (props.color ? props.color : theme.white)};
  font-weight: lighter;
  font-size: ${toRem(13)};
  margin: 0;
  padding-bottom: 12px;
`;
export default SectionParagraph;
