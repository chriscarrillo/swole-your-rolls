/* eslint-disable react/jsx-no-bind */
import {MealPlan} from 'firebase/models/types'
import React from 'react'
import {Button, Card, Container} from 'react-bootstrap'

interface Props {
  mealPlans: MealPlan[]
  onChangeActiveMealPlan(mealPlan: MealPlan): void
}

/**
 * Meal plan table for the main page.
 * @param props Meal plan table properties
 * @return Meal plan table
 */
export const MealPlans: React.FC<Props> = (props: Props) => {
  const mealPlanCards = props.mealPlans.map(plan => (
    <Card key={plan.uid}>
      <Card.Body>
        <h3>{plan.name}</h3>
        <Button onClick={() => props.onChangeActiveMealPlan(plan)}>Select</Button>
      </Card.Body>
    </Card>
  ))

  return <Container>{mealPlanCards}</Container>
}
