import 'theme/app.scss'
import SCSS from 'theme/variables.module.scss'

/**
 * Colors.
 */
export const colors = {
  primary: SCSS.colorsPrimary,
  secondary: SCSS.colorsSecondary,
}

/** Spacers. */
export const spacers = [
  SCSS.spacer0,
  SCSS.spacer1,
  SCSS.spacer2,
  SCSS.spacer3,
  SCSS.spacer4,
  SCSS.spacer5,
  SCSS.spacer6,
  SCSS.spacer7,
]

/** Width breakpoints. */
export const breakpoints = {
  max: {
    lg: SCSS.breakpointsMaxLg,
    md: SCSS.breakpointsMaxMd,
    sm: SCSS.breakpointsMaxSm,
    xs: SCSS.breakpointsMaxXs,
  },
  min: {
    lg: SCSS.breakpointsMinLg,
    md: SCSS.breakpointsMinMd,
    sm: SCSS.breakpointsMinSm,
    xl: SCSS.breakpointsMinXl,
  },
}
