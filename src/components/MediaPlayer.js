import React from "react";
import styled from "styled-components";
import { toRem } from "../utils/utils";
import embed from 'embed-video'

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: ${toRem(20)};
  height: 0;
  overflow: hidden;
  width: 100%;
`;

const MediaPlayer = ({ url }) => (
  <VideoWrapper dangerouslySetInnerHTML={{ __html: embed(url, { query: { rel: 0 }, image: 'mqdefault' }) }} />
);

export default MediaPlayer;
