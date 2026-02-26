// @ts-check

import { expect, test } from '@jest/globals'
import { genDiff } from '../../bin/gendiff.js'
import { printjson } from '../../src/cmp_utils.js'
/*
test('compareobj', ()=>{
 const file1 = import.meta.dirname + '/file1.json'
  const file2 = import.meta.dirname + '/file2.json'
  expect(compareObj(readfile(file1), readfile(file2))).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}\n')
})
  */
test('printjson0', () => {
  expect(printjson([
    { sign: ' ', key: 'one', value: '123' },
  ])).toBe('{\n    one: 123\n}')
})
test('printjson1', () => {
  expect(printjson([
    { sign: ' ', key: 'one', value: [{ sign: ' ', key: 'one', value: '123' }] },
  ])).toBe('{\n    one: {\n        one: 123\n    }\n}')
})
/*
test('readjson', () => {
  const file1 = import.meta.dirname + '/file1.json'
  expect(JSON.stringify(readfile(file1))).toBe(JSON.stringify({
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  }))
})
*/
test('compare files', () => {
  const file1 = import.meta.dirname + '/file1.json'
  const file2 = import.meta.dirname + '/file2.json'
  expect(genDiff (file1, file2)).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}\n')
})
