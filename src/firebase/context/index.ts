import {MealPlan, RequestState, User} from 'firebase/models/types'
import {constant, noop} from 'lodash'
import {AddMealPlanValues, AddMealValues} from 'models/FormValues'
import {createContext} from 'react'

/**
 * Firebase information.
 */
export interface FirebaseContext {
  activeMealPlan: MealPlan | undefined
  isLoggedIn: boolean
  mealPlans: MealPlan[]
  user: User | undefined
  addMealPlan(addMealValues: AddMealPlanValues): Promise<void>
  addMealToMealPlan(addMealValues: AddMealValues): Promise<void>
  deleteMealFromMealPlan(mealUid: string): Promise<void>
  deleteMealPlan(mealPlanUid: string): Promise<void>
  login(email: string, password: string): Promise<RequestState>
  logout(): Promise<void>
  register(displayName: string, email: string, password: string): Promise<RequestState>
  setActiveMealPlan(mealPlan: MealPlan): void
}

/**
 * Default context.
 */
export const DEFAULT_CONTEXT: FirebaseContext = {
  activeMealPlan: undefined,
  addMealPlan: constant(Promise.resolve()),
  addMealToMealPlan: constant(Promise.resolve()),
  deleteMealFromMealPlan: constant(Promise.resolve()),
  deleteMealPlan: constant(Promise.resolve()),
  isLoggedIn: false,
  login: constant(Promise.resolve({error: 'ERROR', status: 'ERROR'})),
  logout: constant(Promise.resolve()),
  mealPlans: [],
  register: constant(Promise.resolve({error: 'ERROR', status: 'ERROR'})),
  setActiveMealPlan: noop,
  user: undefined,
}

/**
 * Context implementation.
 */
export const FirebaseContext = createContext(DEFAULT_CONTEXT)

// eslint-disable-next-line functional/immutable-data
FirebaseContext.displayName = 'Firebase'
