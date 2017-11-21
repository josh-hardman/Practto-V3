import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";
import registerServiceWorker from "../registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import Landing from "../pages/index";
import About from "../pages/About";
import Listing from "../pages/listing";
import Contact from "../pages/Contact";
import Search from "../pages/Search";
import State from "../pages/State";
import ResultCard from "../pages/ResultCard";
import theme from "../theme/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import ScrollToTop from "../components/ScrollToTop";
import styled from "styled-components";

const networkInterface = createNetworkInterface({
  uri: "https://api.graphcms.com/simple/v1/cj7mqzlyl07dt0145piidjnni"
});
const client = new ApolloClient({
  networkInterface
});

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
`;

class AppStateContainer extends Component {
  state = {
    service: "",
    city: "",
    insurance: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { service, city, insurance } = this.state;
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ScrollToTop>
                <Wrapper>
                  <Header />
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <Landing
                          service={service}
                          city={city}
                          insurance={insurance}
                          handleChange={this.handleChange}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/search"
                      render={() => (
                        <Search
                          service={service}
                          city={city}
                          insurance={insurance}
                          handleChange={this.handleChange}
                        />
                      )}
                    />
                    <Route
                      path="/listing"
                      render={({ location }) => (
                        <Listing
                          location={location}
                          insurance={insurance}
                          handleChange={this.handleChange}
                        />
                      )}
                    />
                    <Route
                      path="/state"
                      render={({ location }) => <State location={location} />}
                    />
                    <Route path="/about" render={() => <About />} />
                    <Route path="/contact" render={() => <Contact />} />
                  </Switch>
                  <Footer />
                </Wrapper>
              </ScrollToTop>
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default AppStateContainer;
