import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

import AppStateContainer from './containers/AppStateContainer'
import './index.css'

import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import theme from './theme/theme'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graphcms.com/simple/v1/cj7mqzlyl07dt0145piidjnni'
})
const client = new ApolloClient({
  networkInterface
})

const muiTheme = createMuiTheme()

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}><AppStateContainer /></ThemeProvider>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
