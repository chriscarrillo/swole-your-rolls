import {AuthContext} from 'auth/context'
import {Form, Formik, FormikProps} from 'formik'
import {RegisterFormValues} from 'models/FormValues'
import React, {useCallback, useContext} from 'react'
import {Form as BootstrapForm, Button, Col, Container, Row} from 'react-bootstrap'
import {useHistory} from 'react-router'
import styled from 'styled-components'
import * as Yup from 'yup'

const RegisterButton = styled(Button)`
  margin-right: ${({theme}) => theme.spacers[2]};
`

const initialFormValues: RegisterFormValues = {
  email: '',
  password: '',
}

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string().required('An email is required'),
  password: Yup.string().required('A password is required'),
})

/**
 * Register page so users can use the app.
 * @return Register page
 */
export const RegisterPage: React.FC = () => {
  /**
   * Special hooks.
   */
  const history = useHistory()

  /**
   * Contexts.
   */
  const {register} = useContext(AuthContext)

  /**
   * Callbacks.
   */
  const handleRegister = useCallback(
    (formValues: RegisterFormValues) => {
      register(formValues.email, formValues.password)
    },
    [register],
  )

  const handleLoginClick = useCallback(() => {
    history.push('/login')
  }, [history])

  return (
    <Formik
      validateOnBlur
      initialValues={initialFormValues}
      validationSchema={RegisterFormSchema}
      onSubmit={handleRegister}
    >
      {(props: FormikProps<RegisterFormValues>) => (
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
                <RegisterButton type="submit">Register</RegisterButton>
                <Button variant="secondary" onClick={handleLoginClick}>
                  Login
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  )
}
