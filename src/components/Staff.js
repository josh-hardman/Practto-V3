import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";
import Chip from "../components/Chip";
import Avatar from "../components/Avatar";
import SectionParagraph from "../components/SectionParagraph";

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

class Staff extends Component {
  state = {
    index: 0,
    items: this.props.items
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.object,
        name: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired
      })
    ).isRequired
  };

  handleSelect = index =>
    this.setState({
      index
    });

  render() {
    const { index, items } = this.state;
    return (
      <div>
        {items.length > 0 && (
          <div>
            <AvatarWrapper>
              <Avatar widthPercent={80} src={items[index].image.url} />
            </AvatarWrapper>
            {
              items.length > 1 &&
              <ChipWrapper>
                {items.map((item, i) => (
                  <Chip key={i} onClick={() => this.handleSelect(i)}>
                    {item.name}
                  </Chip>
                ))}
              </ChipWrapper>
            }
            <Name>{items[index].name}</Name>
            <DescriptionWrapper>
              <SectionParagraph color={theme.textBlack}>
                {items[index].about}
              </SectionParagraph>
            </DescriptionWrapper>
          </div>
        )}
      </div>
    );
  }
}

export default Staff;
