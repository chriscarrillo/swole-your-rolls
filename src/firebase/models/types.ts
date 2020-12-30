/**
 * Request state.
 */
export type RequestState = RequestSuccess | RequestError

interface RequestSuccess {
  message?: string
  status: 'SUCCESS'
}

interface RequestError {
  status: 'ERROR'
  error: string
}

/**
 * User.
 */
export interface User {
  displayName: string
  email: string
  uid: string
}

/**
 * Meal plan for a user.
 */
export interface MealPlan {
  name: string
  uid: string
  meals: Meal[]
}

/**
 * Meal for a user.
 */
export interface Meal {
  name: string
  time: string
  description: string
  uid: string
  mealPlanUid: string
}
