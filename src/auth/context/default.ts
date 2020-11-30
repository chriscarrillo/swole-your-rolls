import {useCallback, useMemo, useState} from 'react'
import firebase from 'services/firebase'
import {AuthContext} from '.'

/**
 * Construct default authentication context.
 * @return Authentication context.
 */
export const useAuthentication = () => {
  /**
   * States.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  /**
   * Callbacks.
   */
  const login = useCallback(() => {
    if (isLoggedIn) {
      return
    }

    firebase
      .auth()
      .signInWithEmailAndPassword('chris.carrillo217@gmail.com', 'password')
      .then(response => {
        if (response.user) {
          setIsLoggedIn(true)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [isLoggedIn, setIsLoggedIn])

  const logout = useCallback(() => {
    if (isLoggedIn) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setIsLoggedIn(false)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [isLoggedIn, setIsLoggedIn])

  return useMemo<AuthContext>(
    () => ({
      isLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn, login, logout],
  )
}
