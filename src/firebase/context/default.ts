import {RequestState, User} from 'firebase/models/types'
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
  const [user, setUser] = useState<User | undefined>()

  /**
   * Callbacks.
   */
  const login = useCallback(
    async (email: string, password: string) => {
      if (isLoggedIn) {
        return
      }

      let loginState: RequestState = {error: 'ERROR', status: 'ERROR'}

      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          if (response.user) {
            loginState = {
              status: 'SUCCESS',
            }
            setIsLoggedIn(true)
            setUser({
              displayName: response.user.displayName ?? '',
              uid: response.user.uid,
            })
          }
        })
        .catch(error => {
          console.error(error)
          loginState = {
            error: error.message,
            status: 'ERROR',
          }
        })
      return loginState
    },
    [isLoggedIn, setIsLoggedIn, setUser],
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

  const register = useCallback(
    async (displayName: string, email: string, password: string) => {
      if (isLoggedIn) {
        return
      }

      let registerState: RequestState = {error: 'ERROR', status: 'ERROR'}

      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async response => {
          if (response.user) {
            await response.user.updateProfile({displayName}).then(
              () => {
                registerState = {
                  message: 'Registration successful.',
                  status: 'SUCCESS',
                }
              },
              error => {
                registerState = {
                  error: error.message,
                  status: 'ERROR',
                }
              },
            )
          }
        })
        .catch(error => {
          console.error(error)
          registerState = {
            error: error.message,
            status: 'ERROR',
          }
        })
      return registerState
    },
    [isLoggedIn],
  )

  return useMemo<FirebaseContext>(
    () => ({
      isLoggedIn,
      login,
      logout,
      register,
      user,
    }),
    [isLoggedIn, login, logout, register, user],
  )
}
