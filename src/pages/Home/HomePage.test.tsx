import {describe, expect, it} from '@jest/globals'
import {render} from '@testing-library/react'
import React from 'react'
import {HomePage} from '.'

describe('<HomePage />', () => {
  it('should render as expected', () => {
    const {getByText} = render(<HomePage />)
    expect(getByText('Home')).toBeTruthy()
  })
})
