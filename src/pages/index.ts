import {Page} from 'models/Page'
import {GiMeal, GiWeightLiftingUp} from 'react-icons/gi'
import {MdAccountCircle} from 'react-icons/md'

/**
 * All app pages.
 */
export const appPages: Page[] = [
  {
    icon: GiMeal,
    title: 'Meal Plans',
    url: '/home',
  },
  {
    icon: GiWeightLiftingUp,
    title: 'Workout Plans',
    url: '/workout-plans',
  },
  {
    icon: MdAccountCircle,
    title: 'Account',
    url: '/account',
  },
]
