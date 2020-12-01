import {Routes} from 'Routes'

import {AuthProvider} from 'auth/context/provider'
import {Header} from 'components/Header'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import {ThemeProvider} from 'styled-components'
import {theme} from 'theme'

/**
 * Base App.
 * @return Render App
 */
const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)

/**
 * App.
 */
// eslint-disable-next-line import/no-default-export
export default App
