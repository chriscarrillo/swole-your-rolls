import {noop} from 'lodash'
import {createContext} from 'react'

/**
 * Firebase information.
 */
export interface FirebaseContext {
  isLoggedIn: boolean
  login(email: string, password: string): void
  logout(): void
  register(email: string, password: string): void
}

/**
 * Default context.
 */
export const DEFAULT_CONTEXT: FirebaseContext = {
  isLoggedIn: false,
  login: noop,
  logout: noop,
  register: noop,
}

/**
 * Context implementation.
 */
export const FirebaseContext = createContext(DEFAULT_CONTEXT)

// eslint-disable-next-line functional/immutable-data
FirebaseContext.displayName = 'Firebase'
