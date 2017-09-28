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
import theme from "./theme/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./index.css";

const networkInterface = createNetworkInterface({
  uri: "https://api.graphcms.com/simple/v1/cj7mqzlyl07dt0145piidjnni"
});
const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            {/* both /roster and /roster/:number begin with /roster */}
            <Route path="/listing" component={Listing} />
            {/* <Route path="/schedule" component={Schedule} /> */}
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
