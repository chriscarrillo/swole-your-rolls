/**
 * Request state.
 */
export type RequestState = RequestSuccess | RequestError

interface RequestSuccess {
  message?: string
  status: 'SUCCESS'
}

interface RequestError {
  status: 'ERROR'
  error: string
}

/**
 * User.
 */
export interface User {
  displayName: string
  uid: string
}
