/**
 * Login form values for Firebase.
 */
export interface LoginFormValues {
  email: string
  password: string
}

/**
 * Register form values for Firebase.
 */
export interface RegisterFormValues {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

/**
 * Add meal values for Firestore.
 */
export interface AddMealValues {
  description: string
  mealPlanUid: string
  name: string
  time: string
}

/**
 * Add meal plan values for Firestore.
 */
export interface AddMealPlanValues {
  userUid: string
  name: string
}
