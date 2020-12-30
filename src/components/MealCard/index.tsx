import {format} from 'date-fns'
import {FirebaseContext} from 'firebase/context'
import {Meal} from 'firebase/models/types'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'
import {AddMealValues} from 'models/FormValues'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import {Form as BootstrapForm, Button, Card, Modal} from 'react-bootstrap'
import {MdDelete, MdEdit} from 'react-icons/md'
import styled from 'styled-components'
import * as Yup from 'yup'

interface Props {
  meal: Meal
}

const EditButton = styled(MdEdit)`
  &:hover {
    color: ${({theme}) => theme.colors.primary};
    cursor: pointer;
  }
`

const DeleteButton = styled(MdDelete)`
  &:hover {
    color: ${({theme}) => theme.colors.danger};
    cursor: pointer;
  }
`

const EditMealFormSchema = Yup.object().shape({
  description: Yup.string().required('A description is required'),
  name: Yup.string().required('A name is required'),
  time: Yup.string().required('A time is required'),
})

/**
 * Card to display meal information.
 * @param props Meal card props
 * @param props.meal The meal itself
 * @return React component
 */
export const MealCard: React.FC<Props> = ({meal}: Props) => {
  /**
   * Contexts.
   */
  const {deleteMealFromMealPlan, editMealInMealPlan} = useContext(FirebaseContext)

  /**
   * States.
   */
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  /**
   * Memos.
   */
  const time = useMemo(
    () =>
      new Date(
        2020,
        12,
        25,
        Number(meal.time.substring(0, meal.time.indexOf(':'))),
        Number(meal.time.substring(meal.time.indexOf(':') + 1, meal.time.length)),
      ),
    [meal.time],
  )
  const initialValues = useMemo<AddMealValues>(
    () => ({description: meal.description, mealPlanUid: '', name: meal.name, time: meal.time}),
    [meal.description, meal.name, meal.time],
  )

  /**
   * Callbacks.
   */
  const handleCloseDeleteModal = useCallback(() => setShowDeleteModal(false), [setShowDeleteModal])
  const handleOpenDeleteModal = useCallback(() => setShowDeleteModal(true), [setShowDeleteModal])
  const handleDeleteMeal = useCallback(async () => {
    await deleteMealFromMealPlan(meal.uid)
    handleCloseDeleteModal()
  }, [deleteMealFromMealPlan, handleCloseDeleteModal, meal.uid])

  const handleShowForm = useCallback(() => setShowEditForm(true), [setShowEditForm])
  const handleHideForm = useCallback(() => setShowEditForm(false), [setShowEditForm])
  const handleEditMeal = useCallback(
    async (values: AddMealValues, formikHelpers: FormikHelpers<AddMealValues>) => {
      const mealEdit = {
        description: values.description,
        name: values.name,
        time: values.time,
      }

      formikHelpers.setSubmitting(true)
      await editMealInMealPlan(meal.uid, mealEdit)
      formikHelpers.resetForm()
      formikHelpers.setSubmitting(false)
      handleHideForm()
    },
    [editMealInMealPlan, handleHideForm, meal.uid],
  )

  const editMealForm = (
    <Card>
      <Card.Body>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={EditMealFormSchema}
          onSubmit={handleEditMeal}
        >
          {(props: FormikProps<AddMealValues>) => (
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

              <BootstrapForm.Group controlId="description">
                <BootstrapForm.Label>Description</BootstrapForm.Label>
                <BootstrapForm.Control
                  placeholder="Enter meal plan description"
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
                  placeholder="Enter meal plan time"
                  type="time"
                  value={props.values.time}
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
                <Button variant="secondary" onClick={handleHideForm}>
                  Cancel
                </Button>
                <Button type="submit">Edit Meal</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )

  const displayMeal = (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-end">
          <EditButton className="mr-1" size={22} onClick={handleShowForm}>
            Edit
          </EditButton>
          <DeleteButton size={22} onClick={handleOpenDeleteModal}>
            Delete
          </DeleteButton>
          <Modal centered show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header>Warning!</Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this meal? You cannot undo this action.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteMeal}>
                Delete Meal
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Card.Title>{meal.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{meal.description}</Card.Text>
        <span>{format(time, 'h:mm a')}</span>
      </Card.Body>
    </Card>
  )

  const children = showEditForm ? editMealForm : displayMeal

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
