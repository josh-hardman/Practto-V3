import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import Landing from "./pages/index";
import Listing from "./pages/listing";
import Search from "./pages/Search";
import ResultCard from "./pages/ResultCard";
import theme from "./theme/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppStateContainer from "./containers/AppStateContainer";
import "./index.css";

ReactDOM.render(<AppStateContainer />, document.getElementById("root"));

registerServiceWorker();
