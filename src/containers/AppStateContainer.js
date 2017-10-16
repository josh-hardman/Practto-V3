import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";
import registerServiceWorker from "../registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import Landing from "../pages/index";
import Listing from "../pages/listing";
import Search from "../pages/Search";
import ResultCard from "../pages/ResultCard";
import theme from "../theme/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../index.css";

const networkInterface = createNetworkInterface({
  uri: "https://api.graphcms.com/simple/v1/cj7mqzlyl07dt0145piidjnni"
});
const client = new ApolloClient({
  networkInterface
});

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
              <div>
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
                  {/* <Route
                    exact
                    path="/search"
                    render={() => (
                      <Search
                        practiceType={practiceType}
                        city={city}
                        insurance={insurance}
                        handleUpdatePracticeType={this.handleUpdatePracticeType}
                        handleUpdateCity={this.handleUpdateCity}
                        handleUpdateInsurance={this.handleUpdateInsurance}
                      />
                    )}
                  />
                  <Route path="/listing" component={Listing} /> */}
                </Switch>
                <Footer />
              </div>
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default AppStateContainer;
