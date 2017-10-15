import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Link } from "react-router-dom";

import "./index.css";

const StyledHeader = styled.div`margin-bottom: "1.45rem";`;

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const Header = () => (
  <StyledHeader>
    <HeaderContent
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem"
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            fontSize: "18px",
            color: "black",
            textDecoration: "none"
          }}
        >
          Practto
        </Link>
      </h1>
    </HeaderContent>
  </StyledHeader>
);

const TemplateWrapper = ({ children }) => (
  <MuiThemeProvider>
    <ThemeProvider theme={theme}>
      <div>
        <Helmet
          title="Practto"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />
        <Header />

        {children()}
      </div>
    </ThemeProvider>
  </MuiThemeProvider>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
