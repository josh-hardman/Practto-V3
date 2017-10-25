import React, { Component } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";
import Chip from "../components/Chip";
import Avatar from "../components/Avatar";
import SectionParagraph from "../components/SectionParagraph";
import ReactSwipe from "react-swipe";
import ArrowRight from "react-icons/lib/fa/angle-right";
import ArrowLeft from "react-icons/lib/fa/angle-left";
import Card from "../components/Card";

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${toRem(18)};
`;

const ChipWrapper = styled.div`
  margin-top: ${toRem(18)};
  margin-bottom: ${toRem(24)};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 ${toRem(20)};
`;

const Name = styled.h2`
  text-align: center;
  font-size: ${toRem(16)};
  color: ${theme.textBlack};
  font-weight: normal;
  margin-top: ${toRem(16)};
  margin-bottom: ${toRem(16)};
`;

const SwipeWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Review = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
`;

const ButtonLeft = styled.button`
  background: none;
  height: 100%;
  border: none;
  outline: none;
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0px;
  z-index: 2;
`;

const ButtonRight = styled.button`
  background: none;
  height: 100%;
  border: none;
  outline: none;
  position: absolute;
  right: 0;
  top: 0px;
  bottom: 0px;
  z-index: 2;
`;

const ReviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Description = styled.p`
  font-size: ${toRem(12)};
  font-weight: lighter;
  color: ${theme.textBlack};
`;

const CardWithBar = styled(Card) `
  max-width: ${toRem(300)};
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    height: 60px;
    left: 0;
    right: 0;
    background: ${theme.darkRed};
    z-index: 0;
    border-top-left-radius: ${toRem(5)};
    border-top-right-radius: ${toRem(5)};
  }
`;

export default class Staff extends Component {
  state = {
    index: 0,
    items: this.props.items
  };

  handleLeft = () => {
    this.slideshow.prev();
  };

  handleRight = () => {
    this.slideshow.next();
  };

  render() {
    const { items } = this.state;

    return (
      <SwipeWrapper>
        <ButtonLeft onClick={this.handleLeft}>
          <ArrowLeft size={28} color={theme.textBlack} />
        </ButtonLeft>
        <ButtonRight onClick={this.handleRight}>
          <ArrowRight size={28} color={theme.textBlack} />
        </ButtonRight>
        <ReactSwipe
          ref={node => (this.slideshow = node)}
          swipeOptions={{ continuous: true }}
        >
          {items &&
            items.map((item, i) => (
             <div key={i}>
                <AvatarWrapper>
                  <Avatar widthPercent={80} src={item.image.url} />
                </AvatarWrapper>
                <Name>{item.name}</Name>
                <DescriptionWrapper>
                  <SectionParagraph color={theme.textBlack}>
                    {item.about}
                  </SectionParagraph>
                </DescriptionWrapper>
             </div>
            ))}
        </ReactSwipe>
      </SwipeWrapper>
    );
  }

  static propTypes = {};
}
