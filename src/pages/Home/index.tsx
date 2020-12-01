import {FirebaseContext} from 'firebase/context'

import React, {useContext} from 'react'
import {Button} from 'react-bootstrap'

/**
 * Home page.
 * @return Rendered home page
 */
export const HomePage = () => {
  /**
   * Contexts.
   */
  const {logout} = useContext(FirebaseContext)

  return (
    <>
      <h1>Home</h1>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}
