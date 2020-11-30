import {AuthContext} from 'auth/context'
import React, {ReactNode} from 'react'
import {useAuthentication} from '../default'

interface Props {
  children: ReactNode
}

/**
 * Inject authentication context.
 * @param props Auth provider props
 * @param props.children Children
 * @return React component
 */
export const AuthProvider = ({children}: Props) => (
  <AuthContext.Provider value={useAuthentication()}>{children}</AuthContext.Provider>
)
