import { describe, expect, it } from 'vitest'

import validateCredentials, { FieldValidationStatus } from '../../src/utils/validateCredentials'

describe('validateCredentials', () => {
  it('accepts a complete existing credential record', () => {
    expect(
      validateCredentials({
        username: '22XX00001',
        password: 'password',
        q1: 'Question one',
        q2: 'Question two',
        q3: 'Question three',
        a1: 'one',
        a2: 'two',
        a3: 'three'
      })
    ).toBe(FieldValidationStatus.AllFieldsFilled)
  })

  it('rejects an incomplete existing credential record', () => {
    expect(validateCredentials({ username: '22XX00001', password: '' })).toBe(FieldValidationStatus.SomeFieldIsEmpty)
  })
})
