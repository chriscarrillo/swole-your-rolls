import {RequestState, User} from 'firebase/models/types'
import {constant, noop} from 'lodash'
import {createContext} from 'react'

/**
 * Firebase information.
 */
export interface FirebaseContext {
  isLoggedIn: boolean
  user: User | undefined
  login(email: string, password: string): Promise<RequestState | undefined>
  logout(): void
  register(displayName: string, email: string, password: string): Promise<RequestState | undefined>
}

/**
 * Default context.
 */
export const DEFAULT_CONTEXT: FirebaseContext = {
  isLoggedIn: false,
  login: constant(Promise.resolve(undefined)),
  logout: noop,
  register: constant(Promise.resolve(undefined)),
  user: undefined,
}

/**
 * Context implementation.
 */
export const FirebaseContext = createContext(DEFAULT_CONTEXT)

// eslint-disable-next-line functional/immutable-data
FirebaseContext.displayName = 'Firebase'
