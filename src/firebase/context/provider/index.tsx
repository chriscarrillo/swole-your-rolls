import {FirebaseContext} from 'firebase/context'
import React, {ReactNode} from 'react'
import {useFirebase} from '../default'

interface Props {
  children: ReactNode
}

/**
 * Inject Firebase context.
 * @param props Firebase provider props
 * @param props.children Children
 * @return React component
 */
export const FirebaseProvider = ({children}: Props) => (
  <FirebaseContext.Provider value={useFirebase()}>{children}</FirebaseContext.Provider>
)
