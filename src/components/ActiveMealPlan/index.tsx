import {format} from 'date-fns'
import {MealPlan} from 'firebase/models/types'
import React from 'react'
import {Card, CardDeck, Col, Container, Row} from 'react-bootstrap'
import {IoIosAddCircle} from 'react-icons/io'

interface Props {
  mealPlan: MealPlan
}

/**
 * Active meal plan component.
 * @param props Active meal plan props.
 * @return React component
 */
export const ActiveMealPlan = (props: Props) => {
  const meals = props.mealPlan.meals.map(meal => (
    <Col key={meal.uid} as={CardDeck} lg={4} md={6} sm={12}>
      <Card>
        <Card.Header>
          <Card.Title>{meal.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{meal.description}</Card.Text>
          <span>{format(meal.time, 'hh:mm a')}</span>
        </Card.Body>
      </Card>
    </Col>
  ))

  return (
    <Container>
      <h1>{props.mealPlan.name}</h1>
      <Row>
        {meals}
        <Col as={CardDeck} lg={4} md={6} sm={12}>
          <Card>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Text className="mb-1">Add Meal</Card.Text>
              <IoIosAddCircle size={40}>Add Meal</IoIosAddCircle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
