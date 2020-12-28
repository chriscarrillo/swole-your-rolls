import {Meal, MealPlan, RequestState, User} from 'firebase/models/types'
import firebase from 'firebase/service'
import {useCallback, useEffect, useMemo, useState} from 'react'
// Import {useCollectionData} from 'react-firebase-hooks/firestore'
import {FirebaseContext} from '.'

/**
 * Construct default authentication context.
 * @return Authentication context.
 */
export const useFirebase = () => {
  /**
   * States.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User>()
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [activeMealPlan, setSelectedMealPlan] = useState<MealPlan>()

  /**
   * Callbacks.
   */
  const getMealsForMealPlan = useCallback(async (uid: string) => {
    let meals: Meal[] = []
    const mealPlanMeals = await firebase
      .firestore()
      .collection('meals')
      .where('mealPlanUid', '==', uid)
      .get()

    mealPlanMeals.forEach(doc => {
      const newMeal: Meal = {
        description: doc.data().description,
        mealPlanUid: doc.data().mealPlanUid,
        name: doc.data().name,
        time: doc.data().time.toDate(),
        uid: doc.id,
      }
      if (!meals.find(meal => meal.uid === newMeal.uid)) {
        meals = [...meals, newMeal]
      }
    })
    return meals
  }, [])

  const handleAuthStateChange = useCallback(async () => {
    const firebaseUser = firebase.auth().currentUser ?? undefined
    if (firebaseUser !== undefined) {
      const newUser: User = {
        displayName: firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? '',
        uid: firebaseUser.uid,
      }

      // Fetch meal plans.
      const plans = await firebase
        .firestore()
        .collection('mealPlans')
        .where('userUid', '==', newUser.uid)
        .get()

      plans.forEach(async doc => {
        const plan: MealPlan = {
          meals: await getMealsForMealPlan(doc.id),
          name: doc.data().name,
          uid: doc.id,
        }
        setMealPlans(oldMealPlans => {
          if (oldMealPlans.find(mealPlan => mealPlan.uid === plan.uid)) {
            return oldMealPlans
          }
          return [...oldMealPlans, plan]
        })
      })
      setUser(newUser)
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [getMealsForMealPlan, setIsLoggedIn, setUser])

  const login = useCallback(
    async (email: string, password: string) => {
      let loginState: RequestState = {error: 'ERROR', status: 'ERROR'}
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          loginState = {
            status: 'SUCCESS',
          }
          setIsLoggedIn(true)
        })
        .catch(error => {
          setIsLoggedIn(false)
          loginState = {
            error: error.message,
            status: 'ERROR',
          }
          console.error(error)
        })
      return loginState
    },
    [setIsLoggedIn],
  )

  const logout = useCallback(
    async () =>
      firebase
        .auth()
        .signOut()
        .then(() => {
          setIsLoggedIn(false)
        })
        .catch(error => {
          console.error(error)
        }),
    [setIsLoggedIn],
  )

  const register = useCallback(async (displayName: string, email: string, password: string) => {
    let registerState: RequestState = {error: 'ERROR', status: 'ERROR'}
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        if (!response.user) {
          return Promise.reject(new Error('Registration unsuccessful'))
        }
        return firebase
          .auth()
          .currentUser?.updateProfile({
            displayName,
          })
          .then(() => {
            registerState = {
              message: 'Registration successful',
              status: 'SUCCESS',
            }
          })
      })
      .catch(error => {
        console.error(error)
        registerState = {
          error: error.message,
          status: 'ERROR',
        }
      })
    return registerState
  }, [])

  const setActiveMealPlan = useCallback(
    (mealPlan: MealPlan) => {
      const newMealPlan = mealPlans.find(plan => plan.uid === mealPlan.uid)

      if (!newMealPlan) {
        return
      }
      setSelectedMealPlan(newMealPlan)
    },
    [mealPlans],
  )

  /**
   * Effects.
   */
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChange)
    return () => unsubscribe()
  }, [handleAuthStateChange])

  console.log(mealPlans)

  return useMemo<FirebaseContext>(
    () => ({
      activeMealPlan,
      isLoggedIn,
      login,
      logout,
      mealPlans,
      register,
      setActiveMealPlan,
      user,
    }),
    [activeMealPlan, isLoggedIn, login, logout, mealPlans, register, setActiveMealPlan, user],
  )
}
