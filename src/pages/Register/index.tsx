import {FirebaseContext} from 'firebase/context'
import {Form, Formik, FormikProps} from 'formik'
import {RegisterFormValues} from 'models/FormValues'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import {Form as BootstrapForm, Button, Card, Container} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

const RegisterCard = styled(Card)`
  margin: 0 auto;
  max-width: 500px;
`

const FormError = styled.span`
  color: ${({theme}) => theme.colors.danger};
`

const RegisterButton = styled(Button)`
  margin-right: ${({theme}) => theme.spacers[2]};
`

const RegisterError = styled.span`
  display: block;
  color: ${({theme}) => theme.colors.danger};
`

const RegisterMessage = styled(RegisterError)`
  color: ${({theme}) => theme.colors.success};
`

const initialFormValues: RegisterFormValues = {
  confirmPassword: '',
  displayName: '',
  email: '',
  password: '',
}

const RegisterFormSchema = Yup.object().shape({
  confirmPassword: Yup.mixed()
    .required('Password is required')
    .test('match', 'Passwords must match', function () {
      return this.parent.password === this.parent.confirmPassword
    }),
  displayName: Yup.string().required('Display name is required'),
  email: Yup.string().email().required('An email is required'),
  password: Yup.string().required('Password is required'),
})

/**
 * Register page so users can use the app.
 * @return Register page
 */
export const RegisterPage: React.FC = () => {
  /**
   * Custom hooks.
   */
  const history = useHistory()

  /**
   * Contexts.
   */
  const {register} = useContext(FirebaseContext)

  /**
   * States.
   */
  const [error, setError] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>()

  /**
   * Callbacks.
   */
  const handleRegister = useCallback(
    async (formValues: RegisterFormValues) => {
      const response = await register(formValues.displayName, formValues.email, formValues.password)
      if (response.status === 'SUCCESS' && response.message !== undefined) {
        setMessage(response.message)
        setError(undefined)
        history.push('/login')
      }
      if (response.status === 'ERROR') {
        setError(response.error)
        setMessage(undefined)
      }
    },
    [history, register, setError, setMessage],
  )

  /**
   * Memos.
   */
  const errorElement = useMemo(() => <RegisterError>{error}</RegisterError>, [error])
  const messageElement = useMemo(() => <RegisterMessage>{message}</RegisterMessage>, [message])

  return (
    <Container>
      <RegisterCard>
        <RegisterCard.Header as="h3">Register</RegisterCard.Header>
        <RegisterCard.Body>
          <Formik
            validateOnBlur
            initialValues={initialFormValues}
            validationSchema={RegisterFormSchema}
            onSubmit={handleRegister}
          >
            {(props: FormikProps<RegisterFormValues>) => (
              <Form>
                <BootstrapForm.Group controlId="displayName">
                  <BootstrapForm.Label>Display Name</BootstrapForm.Label>
                  <BootstrapForm.Control
                    placeholder="Enter display name"
                    type="text"
                    value={props.values.displayName}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  {props.touched.displayName !== undefined && props.errors.displayName && (
                    <BootstrapForm.Text className="text-danger">
                      {props.errors.displayName}
                    </BootstrapForm.Text>
                  )}
                </BootstrapForm.Group>

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
                    <FormError>{props.errors.password}</FormError>
                  )}
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="confirmPassword">
                  <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    placeholder="Confirm Password"
                    type="password"
                    value={props.values.confirmPassword}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  {props.touched.confirmPassword !== undefined && props.errors.confirmPassword && (
                    <FormError>{props.errors.confirmPassword}</FormError>
                  )}
                  {errorElement}
                  {messageElement}
                </BootstrapForm.Group>
                <RegisterButton type="submit">Register</RegisterButton>
              </Form>
            )}
          </Formik>
        </RegisterCard.Body>
        <RegisterCard.Footer>
          Already have an account? <Link to="/login">Login</Link> now.
        </RegisterCard.Footer>
      </RegisterCard>
    </Container>
  )
}
