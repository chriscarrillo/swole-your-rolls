import {Meal, MealPlan, RequestState, User} from 'firebase/models/types'
import firebase from 'firebase/service'
import {AddMealPlanValues, AddMealValues} from 'models/FormValues'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {FirebaseContext} from '.'

/**
 * Meal plan query.
 */
export const mealPlansQuery = firebase.firestore().collection('mealPlans')

/**
 * Meals query.
 */
export const mealsQuery = firebase.firestore().collection('meals')

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
      const {description, mealPlanUid, name, time} = doc.data()
      const newMeal: Meal = {
        description,
        mealPlanUid,
        name,
        time,
        uid: doc.id,
      }
      if (!meals.find(meal => meal.uid === newMeal.uid)) {
        meals = [...meals, newMeal]
      }
    })
    return meals
  }, [])

  const updateMealPlans = useCallback(
    (plans: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
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
    },
    [getMealsForMealPlan, setMealPlans],
  )

  const handleAuthStateChange = useCallback(async () => {
    const firebaseUser = firebase.auth().currentUser ?? undefined
    if (firebaseUser !== undefined) {
      const newUser: User = {
        displayName: firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? '',
        uid: firebaseUser.uid,
      }

      const plans = await firebase
        .firestore()
        .collection('mealPlans')
        .where('userUid', '==', newUser.uid)
        .get()

      updateMealPlans(plans)
      setUser(newUser)
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [setIsLoggedIn, setUser, updateMealPlans])

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

  const addMealPlan = useCallback(
    async (addMealPlanValues: AddMealPlanValues) => {
      const planToAdd = {
        ...addMealPlanValues,
        userUid: user?.uid,
      }
      await firebase.firestore().collection('mealPlans').add(planToAdd)
      await handleAuthStateChange()
    },
    [handleAuthStateChange, user],
  )

  const addMealToMealPlan = useCallback(async (addMealValues: AddMealValues) => {
    await firebase.firestore().collection('meals').add(addMealValues)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editMealPlan = useCallback(
    async (mealPlanUid: string, mealPlanUpdate: Omit<MealPlan, 'uid'>) => {
      await firebase.firestore().collection('mealPlans').doc(mealPlanUid).update(mealPlanUpdate)
    },
    [],
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editMealInMealPlan = useCallback(
    async (mealUid: string, mealUpdate: Omit<Meal, 'uid' | 'mealPlanUid'>) => {
      await firebase.firestore().collection('meals').doc(mealUid).update(mealUpdate)
    },
    [],
  )

  const deleteMealFromMealPlan = useCallback(async (mealUid: string) => {
    await firebase.firestore().collection('meals').doc(mealUid).delete()
  }, [])

  const deleteMealPlan = useCallback(
    async (mealPlanUid: string) => {
      // Get all meals associated and delete them
      const meals = await getMealsForMealPlan(mealPlanUid)
      meals.forEach(async meal => {
        await deleteMealFromMealPlan(meal.uid)
      })

      // Delete the meal plan itself
      await firebase.firestore().collection('mealPlans').doc(mealPlanUid).delete()
    },
    [deleteMealFromMealPlan, getMealsForMealPlan],
  )

  /**
   * Effects.
   */
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChange)
    return () => unsubscribe()
  }, [handleAuthStateChange])

  return useMemo<FirebaseContext>(
    () => ({
      activeMealPlan,
      addMealPlan,
      addMealToMealPlan,
      deleteMealFromMealPlan,
      deleteMealPlan,
      isLoggedIn,
      login,
      logout,
      mealPlans,
      register,
      setActiveMealPlan,
      user,
    }),
    [
      activeMealPlan,
      addMealPlan,
      addMealToMealPlan,
      deleteMealFromMealPlan,
      deleteMealPlan,
      isLoggedIn,
      login,
      logout,
      mealPlans,
      register,
      setActiveMealPlan,
      user,
    ],
  )
}
