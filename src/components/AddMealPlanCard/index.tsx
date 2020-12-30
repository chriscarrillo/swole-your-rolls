import {FirebaseContext} from 'firebase/context'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'
import {AddMealPlanValues} from 'models/FormValues'
import React, {useCallback, useContext, useState} from 'react'
import {Form as BootstrapForm, Button, Card} from 'react-bootstrap'
import {IoIosAddCircle} from 'react-icons/io'
import styled from 'styled-components'
import * as Yup from 'yup'

const AddMealPlanCardFormCard = styled(Card)`
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: 5px 10px 18px #888888;
    transform: scale(1.05);
    transition: all 0.3s;
  }
`

const initialFormValues: AddMealPlanValues = {
  name: '',
  userUid: '',
}

const AddMealPlanFormSchema = Yup.object().shape({
  name: Yup.string().required('A name is required'),
})

/**
 * Card to add a new meal plan.
 * @return React component
 */
export const AddMealPlanCard: React.FC = () => {
  /**
   * Contexts.
   */
  const {addMealPlan} = useContext(FirebaseContext)

  /**
   * States.
   */
  const [showForm, setShowForm] = useState(false)

  /**
   * Callbacks.
   */
  const handleOnClick = useCallback(() => {
    setShowForm(!showForm)
  }, [showForm, setShowForm])

  const handleAddMeal = useCallback(
    async (values: AddMealPlanValues, formikHelpers: FormikHelpers<AddMealPlanValues>) => {
      formikHelpers.setSubmitting(true)
      await addMealPlan(values)
      formikHelpers.resetForm()
      formikHelpers.setSubmitting(false)
    },
    [addMealPlan],
  )

  const addMealPlanForm = (
    <Card>
      <Card.Body>
        <Formik
          validateOnBlur
          initialValues={initialFormValues}
          validationSchema={AddMealPlanFormSchema}
          onSubmit={handleAddMeal}
        >
          {(props: FormikProps<AddMealPlanValues>) => (
            <Form>
              <BootstrapForm.Group controlId="name">
                <BootstrapForm.Label>Name</BootstrapForm.Label>
                <BootstrapForm.Control
                  placeholder="Enter meal plan name"
                  type="text"
                  value={props.values.name}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                />
                {props.touched.name !== undefined && props.errors.name && (
                  <BootstrapForm.Text className="text-danger">
                    {props.errors.name}
                  </BootstrapForm.Text>
                )}
              </BootstrapForm.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleOnClick}>
                  Cancel
                </Button>
                <Button type="submit">Add Meal Plan</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )

  const addMealCard = (
    <AddMealPlanCardFormCard onClick={handleOnClick}>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Text className="mb-1">Add Meal Plan</Card.Text>
        <IoIosAddCircle size={40}>Add Meal Plan</IoIosAddCircle>
      </Card.Body>
    </AddMealPlanCardFormCard>
  )

  const children = showForm ? addMealPlanForm : addMealCard

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
