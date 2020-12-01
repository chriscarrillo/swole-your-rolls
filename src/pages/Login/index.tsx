import {AuthContext} from 'auth/context'

import {Form, Formik, FormikProps} from 'formik'
import {LoginFormValues} from 'models/FormValues'
import React, {useCallback, useContext} from 'react'
import {Form as BootstrapForm, Button, Col, Container, Row} from 'react-bootstrap'
import styled from 'styled-components'
import * as Yup from 'yup'

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
  const {login} = useContext(AuthContext)

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
    <Formik
      validateOnBlur
      initialValues={initialFormValues}
      validationSchema={LoginFormSchema}
      onSubmit={handleLogin}
    >
      {(props: FormikProps<LoginFormValues>) => (
        <Form>
          <Container>
            <Row>
              <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <LoginButton type="submit">Login</LoginButton>
                <Button variant="secondary">Register</Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  )
}
