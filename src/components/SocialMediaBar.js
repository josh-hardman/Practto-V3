import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";
import Facebook from "react-icons/lib/fa/facebook-official";
import Youtube from "react-icons/lib/fa/youtube-play";
import Instagram from "react-icons/lib/fa/instagram";
import Twitter from "react-icons/lib/fa/twitter";

const StyledBar = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Item = styled.li`
  display: inline-block;
  padding-left: 8px;
  margin: 0;
`;

const SocialMediaBar = ({ facebook, youtube, instagram, twitter }) => (
  <StyledBar>
    <Item>
      <a href={facebook} target="_blank">
        <Facebook size={18} color={theme.darkBlue} />
      </a>
    </Item>
    <Item>
      <a href={youtube} target="_blank">
        <Youtube size={18} color={theme.darkBlue} />
      </a>
    </Item>
    <Item>
      <a href={instagram} target="_blank">
        <Instagram size={18} color={theme.darkBlue} />
      </a>
    </Item>
    <Item>
      <a href={twitter} target="_blank">
        <Twitter size={18} color={theme.darkBlue} />
      </a>
    </Item>
  </StyledBar>
);

export default SocialMediaBar;
