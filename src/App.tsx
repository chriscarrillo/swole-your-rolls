import React from 'react'
import {Button} from 'react-bootstrap'
import {ThemeProvider} from 'styled-components'
import {theme} from 'theme'

/**
 * Base App.
 * @return Render App
 */
const App = () => (
  <ThemeProvider theme={theme}>
    <Button variant="primary">Swole Your Rolls</Button>
  </ThemeProvider>
)

/**
 * App.
 */
// eslint-disable-next-line import/no-default-export
export default App
