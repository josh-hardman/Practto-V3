import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import breakpoints from "../theme/breakpoints";
import { toRem } from "../utils/utils";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import List from "../components/List";
import LineItem from "../components/LineItem";
import Check from "react-icons/lib/md/check-circle";
import Offer from "react-icons/lib/md/local-offer";
import Chat from "react-icons/lib/md/chat";
import ArrowRight from "react-icons/lib/fa/angle-right";
import { Link } from "react-router-dom";

const StyledResultCard = styled(Link) `
  margin: ${toRem(8)};
  width: 100%;
  max-width: 400px;
  background: ${theme.white};
  height: ${toRem(130)};
  position: relative;
  overflow: hidden;
  display: flex;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: -10px;
  bottom: 0;
  width: ${toRem(135)};
  justify-content: center;
  align-items: center;
  display: none;
  padding: 18px;
  display: flex;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -10px;
    bottom: 0;
    width: ${toRem(135)};
    background: ${theme.tan};
    transform: skew(-5deg);
    border-right: 1px solid ${theme.mediumGrey};
  }
`;

const CardTitle = styled.h1`
  color: ${theme.mediumBlue};
  font-weight: lighter;
  font-size: ${toRem(16)};
  margin: 0;

  @media screen and (min-width: ${breakpoints._480}) {
    font-size: ${toRem(18)};
  }
`;

const SubHeader = styled.div``;

const ContentWrapper = styled.div`
  padding: ${toRem(16)} 0 ${toRem(16)} ${toRem(135)};
`;

const Location = styled.span`
  margin-left: ${toRem(6)};
  font-size: ${toRem(12)};
  color: ${theme.darkGrey};
  font-weight: lighter;

  @media screen and (min-width: ${breakpoints._480}) {
    font-size: ${toRem(14)};
  }
`;

const Pill = styled.span`
  padding: 2px 10px;
  border-radius: ${toRem(20)};
  background: ${theme.teal};
  font-size: ${toRem(10)};
  color: ${theme.white};
  font-weight: lighter;

  @media screen and (min-width: ${breakpoints._480}) {
    font-size: ${toRem(12)};
  }
`;

const InfoContainer = styled.div`padding-top: ${toRem(8)};`;

const Detail = styled.span`
  padding-left: 8px;
  font-size: ${toRem(10)};

  @media screen and (min-width: ${breakpoints._480}) {
    font-size: ${toRem(12)};
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const placeholderImg = "data:image/jpeg;base64,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"

const ResultCard = ({
  img,
  id,
  name,
  practiceType,
  location,
  inNetwork,
  numOffers,
  numReviews
}) => (
    <StyledResultCard
      to={`/listing?practice=${id}`}
      style={{ textDecoration: "none" }}
    >
      <AvatarWrapper>
        <Avatar
          height={100}
          src={img ? img : placeholderImg}
        />
      </AvatarWrapper>
      <ContentWrapper>
        <CardTitle>{name}</CardTitle>
        <SubHeader>
          <Pill>{practiceType}</Pill>
          <Location>{`in ${location}`}</Location>
        </SubHeader>
        <InfoContainer>
          <List>
            <LineItem margin={0} color={theme.green} fontSize={8}>
              <Check size={14} />
              <Detail>{inNetwork ? "In Network" : "Out of Network"}</Detail>
            </LineItem>
            <LineItem margin={0} color={theme.lightRed}>
              <Offer size={14} />
              <Detail>
                {numOffers > 0 ? (
                  `${numOffers} Special Offers`
                ) : (
                    "Ask About Special Offers"
                  )}
              </Detail>
            </LineItem>
            <LineItem margin={0} color={theme.lightRed}>
              <Chat size={14} />
              <Detail>
                {numReviews > 0 ? (
                  `${numReviews} Verified Reviews`
                ) : (
                    "No reviews yet"
                  )}
              </Detail>
            </LineItem>
          </List>
        </InfoContainer>
      </ContentWrapper>
      <ArrowContainer>
        <ArrowRight size={32} color={theme.lightBlue} />
      </ArrowContainer>
    </StyledResultCard>
  );

export default ResultCard;
