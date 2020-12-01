import {Routes} from 'Routes'

import {Header} from 'components/Header'
import {FirebaseProvider} from 'firebase/context/provider'
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
      <FirebaseProvider>
        <Header />
        <Routes />
      </FirebaseProvider>
    </ThemeProvider>
  </BrowserRouter>
)

/**
 * App.
 */
// eslint-disable-next-line import/no-default-export
export default App
