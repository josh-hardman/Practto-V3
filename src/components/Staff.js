import React, { Component } from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import { toRem } from '../utils/utils'
import Avatar from '../components/Avatar'
import SectionParagraph from '../components/SectionParagraph'
import ReactSwipe from 'react-swipe'
import ArrowRight from 'react-icons/lib/fa/angle-right'
import ArrowLeft from 'react-icons/lib/fa/angle-left'
import PropTypes from 'prop-types'

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${toRem(18)};
`

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 ${toRem(20)};
`

const Name = styled.h2`
  text-align: center;
  font-size: ${toRem(16)};
  color: ${theme.textBlack};
  font-weight: normal;
  margin-top: ${toRem(16)};
  margin-bottom: ${toRem(16)};
`

const SwipeWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

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
`

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
`

export default class Staff extends Component {
  state = {
    index: 0,
    items: this.props.items
  }

  handleLeft = () => {
    this.slideshow.prev()
  }

  handleRight = () => {
    this.slideshow.next()
  }

  render () {
    const { items = [] } = this.state

    return (
      <SwipeWrapper>
        {items.length > 1 &&
          <ButtonLeft onClick={this.handleLeft}>
            <ArrowLeft size={28} color={theme.textBlack} />
          </ButtonLeft>}
        {items.length > 1 &&
          <ButtonRight onClick={this.handleRight}>
            <ArrowRight size={28} color={theme.textBlack} />
          </ButtonRight>}
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
    )
  }

  static propTypes = {}
}

Staff.propTypes = {
  items: PropTypes.array
}
