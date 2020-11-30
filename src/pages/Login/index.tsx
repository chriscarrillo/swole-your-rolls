import {AuthContext} from 'auth/context'

import React, {useContext} from 'react'
import {Button} from 'react-bootstrap'

/**
 * Login page.
 * @return Rendered Login page
 */
export const LoginPage = () => {
  /**
   * Contexts.
   */
  const {login} = useContext(AuthContext)

  return (
    <>
      <h1>Login</h1>
      <Button onClick={login}>Login</Button>
    </>
  )
}
