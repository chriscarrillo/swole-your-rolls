import {ActiveMealPlan} from 'components/ActiveMealPlan'
import {MealPlans} from 'components/MealPlans'
import {FirebaseContext} from 'firebase/context'
import React, {useContext} from 'react'
import {Container} from 'react-bootstrap'

/**
 * Home page.
 * @return Rendered home page
 */
export const HomePage: React.FC = () => {
  const {activeMealPlan, mealPlans, setActiveMealPlan, user} = useContext(FirebaseContext)

  if (activeMealPlan) {
    return <ActiveMealPlan mealPlan={activeMealPlan} />
  }

  const greeting =
    user?.displayName !== undefined && user.displayName.length > 0 ? (
      <h1>{user.displayName}&apos;s Meal Plans</h1>
    ) : (
      <h1>Meal Plans</h1>
    )
  const mealPlanData =
    mealPlans.length > 0 ? (
      <MealPlans mealPlans={mealPlans} onChangeActiveMealPlan={setActiveMealPlan} />
    ) : (
      <span>You don&apos;t have any meal plans! Create one now!</span>
    )
  return (
    <Container>
      {greeting}
      {mealPlanData}
    </Container>
  )
}
