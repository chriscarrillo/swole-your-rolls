import {AddMealPlanCard} from 'components/AddMealPlanCard'
import {MealPlanCard} from 'components/MealPlanCard'
import {MealPlan} from 'firebase/models/types'
import React from 'react'
import {CardDeck, Col, Container, Row} from 'react-bootstrap'

interface Props {
  mealPlans: MealPlan[]
}

/**
 * Meal plan table for the main page.
 * @param props Meal plan table properties
 * @param props.mealPlans Meal plans for the cards
 * @return Meal plan table
 */
export const MealPlans: React.FC<Props> = ({mealPlans}: Props) => {
  const mealPlanCards = mealPlans.map(plan => (
    <Col key={plan.uid} as={CardDeck} className="mb-2" lg={4} md={6} sm={12}>
      <MealPlanCard mealPlan={plan} />
    </Col>
  ))

  return (
    <Container>
      <Row>
        {mealPlanCards}
        <Col as={CardDeck} className="mb-2" lg={4} md={6} sm={12}>
          <AddMealPlanCard />
        </Col>
      </Row>
    </Container>
  )
}
