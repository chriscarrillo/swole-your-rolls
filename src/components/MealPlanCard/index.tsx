import {FirebaseContext} from 'firebase/context'
import {MealPlan} from 'firebase/models/types'
import React, {useCallback, useContext, useState} from 'react'
import {Button, Card, Modal} from 'react-bootstrap'
import {MdDelete, MdEdit} from 'react-icons/md'
import styled from 'styled-components'

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
  const {deleteMealPlan, setActiveMealPlan} = useContext(FirebaseContext)

  /**
   * States.
   */
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  return (
    <Card>
      <Card.Header className="p-0">
        <div className="d-flex justify-content-end">
          <EditButton className="mr-1" size={22}>
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
}
