import {FirebaseContext} from 'firebase/context'
import {HomePage} from 'pages/Home'
import {LoginPage} from 'pages/Login'
import {RegisterPage} from 'pages/Register'
import React, {useContext} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

/**
 * Defines the routes accessible by authentication.
 * @return Routes
 */
export const Routes: React.FC = () => {
  /**
   * Contexts.
   */
  const {isLoggedIn} = useContext(FirebaseContext)

  const loggedInRoutes = () => (
    <Switch>
      <Route exact component={HomePage} path="/" />
      <Redirect to="/" />
    </Switch>
  )
  const loggedOutRoutes = () => (
    <Switch>
      <Route exact component={LoginPage} path="/login" />
      <Route exact component={RegisterPage} path="/register" />
      <Redirect to="/login" />
    </Switch>
  )

  return isLoggedIn ? loggedInRoutes() : loggedOutRoutes()
}
