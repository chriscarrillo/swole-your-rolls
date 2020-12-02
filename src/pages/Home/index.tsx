import {FirebaseContext} from 'firebase/context'
import React, {useContext} from 'react'
import {Container} from 'react-bootstrap'

/**
 * Home page.
 * @return Rendered home page
 */
export const HomePage: React.FC = () => {
  /**
   * Contexts.
   */
  const {user} = useContext(FirebaseContext)

  return (
    <Container fluid>
      <h2>{user?.displayName}&apos;s Meal Plans</h2>
    </Container>
  )
}
