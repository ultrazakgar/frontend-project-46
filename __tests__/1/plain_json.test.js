// @ts-check

import { expect, test } from '@jest/globals'
import { compareObjects } from '../../src/cmp_utils.js'

test('plain_json', () => {
  expect(JSON.stringify(compareObjects({ a: 1 }, { a: 1 }))).toBe(JSON.stringify([{ sign: ' ', key: 'a', value: 1 }]))
})
