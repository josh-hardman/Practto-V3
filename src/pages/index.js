import React, { Component } from "react";
import styled from "styled-components";
import { toRem } from "../utils/utils";
import theme from "../theme/theme";
import Section from "../layouts/Section";
// import Typist from "react-typist";

const Background = styled.div`
  background: ${theme.mediumBlue};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -2;
`;

const Lede = styled.h1`
  font-size: ${toRem(33)};
  text-align: center;
  color: ${theme.white};
  font-weight: normal;
`;

class Landing extends Component {
  state = {
    words: ["Dentist", "Chiropractor", "Lawyer"],
    index: 0
  };

  onHeaderTyped = () => {
    console.log("end");
    this.setState({
      index: 1
    });
    this.forceUpdate();
  };

  render() {
    const { index, words } = this.state;
    return (
      <div>
        <Section background={theme.lightBlue}>
          <Background />
          <Lede>Find Your Family</Lede>
          {/* <Typist
            className="TypistExample-message"
            delayGenerator={this.delayGen}
            cursor={{ hideWhenDone: true }}
          >
            * Easy to style
            <Typist.Delay ms={1250} />
            <br />
            * Easy to customize
            <Typist.Delay ms={1250} />
            <br />
            * Easy to use backspace
            <Typist.Backspace count={23} delay={750} />
            <span>
              <a href={"test"} className="flash">
                docs
              </a>
            </span>
            <br />
          </Typist> */}
        </Section>
      </div>
    );
  }
}

export default Landing;
