import {Routes} from 'Routes'
import firebase from 'firebase/app'
import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {BrowserRouter} from 'react-router-dom'
// Import {useCollectionData} from 'react-firebase-hooks/firestore'
import {ThemeProvider} from 'styled-components'
import {theme} from 'theme'

import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyCLwAHYAph5aq7Qjm7_VYNIhtZxZ21qet8',
  appId: '1:921738482671:web:f8fd7594074c9f35315c1a',
  authDomain: 'swole-your-rolls.firebaseapp.com',
  databaseURL: 'https://swole-your-rolls.firebaseio.com',
  measurementId: 'G-7WDEELDZ7L',
  messagingSenderId: '921738482671',
  projectId: 'swole-your-rolls',
  storageBucket: 'swole-your-rolls.appspot.com',
})

const auth = firebase.auth()
// Const firestore = firebase.firestore()

/**
 * Base App.
 * @return Render App
 */
const App = () => {
  const [user] = useAuthState(auth)
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
