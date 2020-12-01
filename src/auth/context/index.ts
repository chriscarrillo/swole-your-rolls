import {noop} from 'lodash'
import {createContext} from 'react'

/**
 * Authentication information.
 */
export interface AuthContext {
  isLoggedIn: boolean
  login(email: string, password: string): void
  logout(): void
  register(email: string, password: string): void
}

/**
 * Default context.
 */
export const DEFAULT_CONTEXT: AuthContext = {
  isLoggedIn: false,
  login: noop,
  logout: noop,
  register: noop,
}

/**
 * Context implementation.
 */
export const AuthContext = createContext(DEFAULT_CONTEXT)

// eslint-disable-next-line functional/immutable-data
AuthContext.displayName = 'Auth'
