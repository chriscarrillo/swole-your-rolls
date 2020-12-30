import {FirebaseContext} from 'firebase/context'
import {MealPlan} from 'firebase/models/types'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'
import {AddMealPlanValues} from 'models/FormValues'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import {Form as BootstrapForm, Button, Card, Modal} from 'react-bootstrap'
import {MdDelete, MdEdit} from 'react-icons/md'
import styled from 'styled-components'
import * as Yup from 'yup'

interface Props {
  mealPlan: MealPlan
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

const EditMealPlanFormSchema = Yup.object().shape({
  name: Yup.string().required('A name is required'),
})

/**
 * Meal plan card.
 * @param props Meal plan card props
 * @param props.mealPlan Meal plan
 * @return React component
 */
export const MealPlanCard = ({mealPlan}: Props) => {
  /**
   * Contexts.
   */
  const {deleteMealPlan, editMealPlan, setActiveMealPlan} = useContext(FirebaseContext)

  /**
   * States.
   */
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  /**
   * Memos.
   */
  const initialFormValues = useMemo<AddMealPlanValues>(
    () => ({
      name: mealPlan.name,
      userUid: '',
    }),
    [mealPlan.name],
  )

  /**
   * Callbacks.
   */
  const handleCloseDeleteModal = useCallback(() => setShowDeleteModal(false), [setShowDeleteModal])
  const handleOpenDeleteModal = useCallback(() => setShowDeleteModal(true), [setShowDeleteModal])
  const handleDeleteMealPlan = useCallback(async () => {
    await deleteMealPlan(mealPlan.uid)
    handleCloseDeleteModal()
  }, [deleteMealPlan, handleCloseDeleteModal, mealPlan.uid])
  const handleUpdateActiveMealPlan = useCallback(() => setActiveMealPlan(mealPlan), [
    mealPlan,
    setActiveMealPlan,
  ])

  const handleShowForm = useCallback(() => setShowEditForm(true), [setShowEditForm])
  const handleHideForm = useCallback(() => setShowEditForm(false), [setShowEditForm])
  const handleEditMealPlan = useCallback(
    async (values: AddMealPlanValues, formikHelpers: FormikHelpers<AddMealPlanValues>) => {
      formikHelpers.setSubmitting(true)
      await editMealPlan(mealPlan.uid, {name: values.name})
      formikHelpers.resetForm()
      formikHelpers.setSubmitting(false)
      handleHideForm()
    },
    [editMealPlan, handleHideForm, mealPlan.uid],
  )

  const editMealPlanForm = (
    <Card>
      <Card.Body>
        <Formik
          validateOnBlur
          initialValues={initialFormValues}
          validationSchema={EditMealPlanFormSchema}
          onSubmit={handleEditMealPlan}
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

  const displayMealPlan = (
    <Card>
      <Card.Header className="p-0">
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
              Are you sure you want to delete this meal plan? You cannot undo this action.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteMealPlan}>
                Delete Meal Plan
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title as="h3">{mealPlan.name}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button onClick={handleUpdateActiveMealPlan}>Select</Button>
      </Card.Footer>
    </Card>
  )

  const children = showEditForm ? editMealPlanForm : displayMealPlan

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
