import {Routes} from 'Routes'

import {AuthProvider} from 'auth/context/provider'
import React from 'react'
import {Container} from 'react-bootstrap'
import {BrowserRouter} from 'react-router-dom'

import {ThemeProvider} from 'styled-components'
import {theme} from 'theme'

/**
 * Base App.
 * @return Render App
 */
const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container fluid>
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
)

/**
 * App.
 */
// eslint-disable-next-line import/no-default-export
export default App
