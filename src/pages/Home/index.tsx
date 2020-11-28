import React, {useCallback} from 'react'
import {Button} from 'react-bootstrap'
import firebase from 'services/firebase'

/**
 * Home page.
 * @return Rendered home page
 */
export const HomePage = () => {
  /**
   * Callbacks.
   */
  const logout = useCallback(async () => {
    await firebase.auth().signOut()
  }, [])

  return (
    <>
      <h1>Home</h1>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}
