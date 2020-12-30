import {AddMealCard} from 'components/AddMealCard'
import {format} from 'date-fns'
import {mealsQuery} from 'firebase/context/default'
import {Meal, MealPlan} from 'firebase/models/types'
import React from 'react'
import {Card, CardDeck, Col, Container, Row} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'

interface Props {
  mealPlan: MealPlan
}

/**
 * Active meal plan component.
 * @param props Active meal plan props.
 * @return React component
 */
export const ActiveMealPlan = (props: Props) => {
  const [meals] = useCollectionData(mealsQuery.where('mealPlanUid', '==', props.mealPlan.uid), {
    idField: 'uid',
  })

  const mealPlanMeals = meals as Meal[] | undefined
  console.log('meals', mealPlanMeals)
  const mealElements = mealPlanMeals?.map(meal => {
    const time = new Date(
      2020,
      12,
      25,
      Number(meal.time.substring(0, meal.time.indexOf(':'))),
      Number(meal.time.substring(meal.time.indexOf(':') + 1, meal.time.length)),
    )
    return (
      <Col key={meal.uid} as={CardDeck} className="mb-2" lg={4} md={6} sm={12}>
        <Card>
          <Card.Header>
            <Card.Title>{meal.name}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{meal.description}</Card.Text>
            <span>{format(time, 'h:mm a')}</span>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  return (
    <Container>
      <h1>{props.mealPlan.name}</h1>
      <Row>
        {mealElements}
        <Col as={CardDeck} className="mb-2" lg={4} md={6} sm={12}>
          <AddMealCard mealPlanUid={props.mealPlan.uid} />
        </Col>
      </Row>
    </Container>
  )
}
