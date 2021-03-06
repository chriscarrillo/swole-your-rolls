import {AddMealCard} from 'components/AddMealCard'
import {MealCard} from 'components/MealCard'
import {mealsQuery} from 'firebase/context/default'
import {Meal, MealPlan} from 'firebase/models/types'
import React from 'react'
import {CardDeck, Col, Container, Row} from 'react-bootstrap'
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
  const mealElements = mealPlanMeals?.map(meal => (
    <Col key={meal.uid} as={CardDeck} className="mb-2" lg={4} md={6} sm={12}>
      <MealCard meal={meal} />
    </Col>
  ))

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
