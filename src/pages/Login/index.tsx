import React, {useCallback} from 'react'
import {Button} from 'react-bootstrap'
import firebase from 'services/firebase'

/**
 * Login page.
 * @return Rendered Login page
 */
export const LoginPage = () => {
  /**
   * Callbacks.
   */
  const login = useCallback(async () => {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }, [])

  return (
    <>
      <h1>Login</h1>
      <Button onClick={login}>Login with Google</Button>
    </>
  )
}
