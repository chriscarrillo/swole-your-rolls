import {FirebaseContext} from 'firebase/context'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'
import {AddMealValues} from 'models/FormValues'
import React, {useCallback, useContext, useState} from 'react'
import {Form as BootstrapForm, Button, Card} from 'react-bootstrap'
import {IoIosAddCircle} from 'react-icons/io'
import styled from 'styled-components'
import * as Yup from 'yup'

interface Props {
  mealPlanUid: string
}

const AddMealCardFormCard = styled(Card)`
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: 5px 10px 18px #888888;
    transform: scale(1.05);
    transition: all 0.3s;
  }
`

const initialFormValues: AddMealValues = {
  description: '',
  mealPlanUid: '',
  name: '',
  time: '',
}

const AddMealFormSchema = Yup.object().shape({
  description: Yup.string().required('A description is required'),
  name: Yup.string().required('A name is required'),
  time: Yup.string().required('A time is required'),
})

/**
 * Card to add a new meal to a meal plan.
 * @param props Add meal card props.
 * @param props.mealPlanUid The unique identifer for the meal plan.
 * @return React component
 */
export const AddMealCard: React.FC<Props> = ({mealPlanUid}: Props) => {
  /**
   * Contexts.
   */
  const {addMealToMealPlan} = useContext(FirebaseContext)

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
    async (values: AddMealValues, formikHelpers: FormikHelpers<AddMealValues>) => {
      formikHelpers.setSubmitting(true)
      const mealToAdd = {
        ...values,
        mealPlanUid,
      }
      await addMealToMealPlan(mealToAdd)
      formikHelpers.resetForm()
      formikHelpers.setSubmitting(false)
    },
    [addMealToMealPlan, mealPlanUid],
  )

  const addMealForm = (
    <Card>
      <Card.Body>
        <Formik
          validateOnBlur
          initialValues={initialFormValues}
          validationSchema={AddMealFormSchema}
          onSubmit={handleAddMeal}
        >
          {(props: FormikProps<AddMealValues>) => (
            <Form>
              <BootstrapForm.Group controlId="name">
                <BootstrapForm.Label>Name</BootstrapForm.Label>
                <BootstrapForm.Control
                  placeholder="Enter meal name"
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

              <BootstrapForm.Group controlId="description">
                <BootstrapForm.Label>Description</BootstrapForm.Label>
                <BootstrapForm.Control
                  placeholder="Description"
                  type="text"
                  value={props.values.description}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                />
                {props.touched.description !== undefined && props.errors.description && (
                  <BootstrapForm.Text className="text-danger">
                    {props.errors.description}
                  </BootstrapForm.Text>
                )}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="time">
                <BootstrapForm.Label>Time</BootstrapForm.Label>
                <BootstrapForm.Control
                  placeholder="time"
                  type="time"
                  value={props.values.time.toString()}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                />
                {props.touched.time !== undefined && props.errors.time && (
                  <BootstrapForm.Text className="text-danger">
                    {props.errors.time}
                  </BootstrapForm.Text>
                )}
              </BootstrapForm.Group>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleOnClick}>
                  Cancel
                </Button>
                <Button type="submit">Add Meal</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )

  const addMealCard = (
    <AddMealCardFormCard onClick={handleOnClick}>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Text className="mb-1">Add Meal</Card.Text>
        <IoIosAddCircle size={40}>Add Meal</IoIosAddCircle>
      </Card.Body>
    </AddMealCardFormCard>
  )

  const children = showForm ? addMealForm : addMealCard

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
