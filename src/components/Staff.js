import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";
import Paper from "material-ui/Paper";
import Chip from "../components/Chip";
import Avatar from "../components/Avatar";
import SectionParagraph from "../components/SectionParagraph";

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ChipWrapper = styled.div`
  margin-top: ${toRem(18)};
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
  margin: ${toRem(8)} 0;
`;

class Staff extends Component {
  state = {
    index: 0,
    items: this.props.items
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
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
        <AvatarWrapper>
          <Avatar src={items[index].image.file.url} />
        </AvatarWrapper>
        <Name>{items[index].name}</Name>
        <DescriptionWrapper>
          <SectionParagraph color={theme.textBlack}>
            {items[index].description}
          </SectionParagraph>
        </DescriptionWrapper>
        <ChipWrapper>
          {items.map((item, i) => (
            <Chip key={i} onClick={() => this.handleSelect(i)}>
              {item.name}
            </Chip>
          ))}
        </ChipWrapper>
      </div>
    );
  }
}

export default Staff;
