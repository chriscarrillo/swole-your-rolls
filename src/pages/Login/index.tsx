import {FirebaseContext} from 'firebase/context'
import {Form, Formik, FormikProps} from 'formik'
import {LoginFormValues} from 'models/FormValues'
import React, {useCallback, useContext} from 'react'
import {Form as BootstrapForm, Button, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

const LoginCard = styled(Card)`
  margin: 0 auto;
  max-width: 500px;
`

const LoginButton = styled(Button)`
  margin-right: ${({theme}) => theme.spacers[2]};
`

const initialFormValues: LoginFormValues = {
  email: '',
  password: '',
}

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().required('An email is required'),
  password: Yup.string().required('A password is required'),
})

/**
 * Login page.
 * @return Rendered Login page
 */
export const LoginPage = () => {
  /**
   * Contexts.
   */
  const {login} = useContext(FirebaseContext)

  /**
   * Callbacks.
   */
  const handleLogin = useCallback(
    (formValues: LoginFormValues) => {
      login(formValues.email, formValues.password)
    },
    [login],
  )

  return (
    <Container fluid>
      <LoginCard>
        <LoginCard.Header as="h3">Login</LoginCard.Header>
        <LoginCard.Body>
          <Formik
            validateOnBlur
            initialValues={initialFormValues}
            validationSchema={LoginFormSchema}
            onSubmit={handleLogin}
          >
            {(props: FormikProps<LoginFormValues>) => (
              <Form>
                <BootstrapForm.Group controlId="email">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <BootstrapForm.Control
                    placeholder="Enter email"
                    type="email"
                    value={props.values.email}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  {props.touched.email !== undefined && props.errors.email && (
                    <BootstrapForm.Text className="text-danger">
                      {props.errors.email}
                    </BootstrapForm.Text>
                  )}
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="password">
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    placeholder="Password"
                    type="password"
                    value={props.values.password}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  {props.touched.password !== undefined && props.errors.password && (
                    <BootstrapForm.Text className="text-danger">
                      {props.errors.password}
                    </BootstrapForm.Text>
                  )}
                </BootstrapForm.Group>
                <LoginButton type="submit">Login</LoginButton>
              </Form>
            )}
          </Formik>
        </LoginCard.Body>
        <LoginCard.Footer>
          Need an account? <Link to="/register">Register</Link> now.
        </LoginCard.Footer>
      </LoginCard>
    </Container>
  )
}
