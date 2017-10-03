import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import breakpoints from "../theme/breakpoints";
import { toRem } from "../utils/utils";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";

const StyledResultCard = styled.div`
  width: 100%;
  margin-right: ${toRem(18)};
  margin-left: ${toRem(18)};
  max-width: ${breakpoints._480};
  background: ${theme.white};
  height: ${toRem(130)};
  position: relative;
  overflow: hidden;
  display: flex;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -10px;
    bottom: 0;
    width: ${toRem(126)};
    background: ${theme.tan};
    transform: skew(-5deg);
    border-right: 1px solid ${theme.mediumGrey};
  }
`;

const AvatarWrapper = styled.div`
  height: 100%;
  width: ${toRem(116)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.h1`
  color: ${theme.mediumBlue};
  font-weight: lighter;
  font-size: ${toRem(18)};
  margin: 0;
`;

const SubHeader = styled.div``;

const ContentWrapper = styled.div`padding: ${toRem(16)} ${toRem(32)};`;

const Location = styled.span`
  margin-left: ${toRem(6)};
  font-size: ${toRem(14)};
  color: ${theme.darkGrey};
  font-weight: lighter;
`;

const Pill = styled.span`
  padding: 2px 10px;
  border-radius: ${toRem(20)};
  background: ${theme.teal};
  font-size: ${toRem(12)};
  color: ${theme.white};
  font-weight: lighter;
`;

const InfoContainer = styled.div`padding-top: ${toRem(12)};`;

const ResultCard = () => (
  <StyledResultCard>
    <AvatarWrapper>
      <Avatar
        height={100}
        src="data:image/jpeg;base64,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"
      />
    </AvatarWrapper>
    <ContentWrapper>
      <CardTitle>Canyonlands Dental</CardTitle>
      <SubHeader>
        <Pill>Dentist</Pill>
        <Location>in Lehi, UT</Location>
      </SubHeader>
      <InfoContainer>Other Stuff</InfoContainer>
    </ContentWrapper>
  </StyledResultCard>
);

export default ResultCard;
