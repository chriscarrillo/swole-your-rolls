import firebase from 'firebase/app'
import {HomePage} from 'pages/Home'
import {LoginPage} from 'pages/Login'
import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

interface Props {
  user: firebase.User | undefined
}

/**
 * Defines the routes accessible by authentication.
 * @param props Props for the Routes
 * @return Routes
 */
export const Routes: React.FC<Props> = (props: Props) => {
  const loggedInRoutes = () => (
    <Switch>
      <Route exact component={HomePage} path="/home" />
      <Redirect to="/home" />
    </Switch>
  )
  const loggedOutRoutes = () => (
    <Switch>
      <Route exact component={LoginPage} path="/login" />
      <Redirect to="/login" />
    </Switch>
  )

  return props.user ? loggedInRoutes() : loggedOutRoutes()
}
