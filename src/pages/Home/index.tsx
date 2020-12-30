import {ActiveMealPlan} from 'components/ActiveMealPlan'
import {MealPlans} from 'components/MealPlans'
import {FirebaseContext} from 'firebase/context'
import {mealPlansQuery} from 'firebase/context/default'
import {MealPlan} from 'firebase/models/types'
import React, {useContext} from 'react'
import {Container} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'

/**
 * Home page.
 * @return Rendered home page
 */
export const HomePage: React.FC = () => {
  const {activeMealPlan, user} = useContext(FirebaseContext)
  const [mealPlans] = useCollectionData(mealPlansQuery.where('userUid', '==', user?.uid), {
    idField: 'uid',
  })

  const userMealPlans = mealPlans as MealPlan[] | undefined
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
    userMealPlans !== undefined && userMealPlans.length > 0 ? (
      <MealPlans mealPlans={userMealPlans} />
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
