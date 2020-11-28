import {Routes} from 'Routes'

import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {BrowserRouter} from 'react-router-dom'

import firebase from 'services/firebase'
import {ThemeProvider} from 'styled-components'
import {theme} from 'theme'

/**
 * Base App.
 * @return Render App
 */
const App = () => {
  const [user] = useAuthState(firebase.auth())
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes user={user} />
      </ThemeProvider>
    </BrowserRouter>
  )
}

/**
 * App.
 */
// eslint-disable-next-line import/no-default-export
export default App
