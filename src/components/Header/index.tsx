import {AuthContext} from 'auth/context'
import React, {useContext} from 'react'

/**
 * Header.
 * @return Header of the page
 */
export const Header: React.FC = () => {
  /**
   * Contexts.
   */
  const {isLoggedIn} = useContext(AuthContext)

  const children = isLoggedIn ? <h1>Swole Your Roles | Welcome</h1> : <h1>Swole Your Rolls</h1>
  return <header>{children}</header>
}
