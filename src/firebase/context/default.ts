import firebase from 'firebase/service'
import {useCallback, useMemo, useState} from 'react'
import {FirebaseContext} from '.'

/**
 * Construct default authentication context.
 * @return Authentication context.
 */
export const useFirebase = () => {
  /**
   * States.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  /**
   * Callbacks.
   */
  const login = useCallback(
    (email: string, password: string) => {
      if (isLoggedIn) {
        return
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          if (response.user) {
            setIsLoggedIn(true)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    [isLoggedIn, setIsLoggedIn],
  )

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

  const register = useCallback((email: string, password: string) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log('registered', response)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return useMemo<FirebaseContext>(
    () => ({
      isLoggedIn,
      login,
      logout,
      register,
    }),
    [isLoggedIn, login, logout, register],
  )
}
