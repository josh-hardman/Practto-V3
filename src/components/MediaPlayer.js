import React from 'react'
import styled from 'styled-components'
import { toRem } from '../utils/utils'

const VideoWrapper = styled.div`
	position: relative;
	padding-bottom: 56.25%;
	padding-top: ${toRem(20)};
	height: 0;
	overflow: hidden;
`

const Video = styled.iframe`
	margin-top: ${toRem(12)};
	border: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

const MediaPlayer = ({ url }) => (
	<VideoWrapper>
		<Video src={url} />
	</VideoWrapper>
)

export default MediaPlayer
