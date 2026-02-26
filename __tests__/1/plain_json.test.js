// @ts-check

import { expect, test } from '@jest/globals'
import { readfile } from '../../src/cmp_utils.js'
import * as yaml from 'js-yaml'

test('read json file', () => {
  const file1 = import.meta.dirname + '/file1.json'
  expect(JSON.stringify(readfile(file1))).toBe(JSON.stringify({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  }))
})
test('yaml.load wtf?', () => {
  expect(JSON.stringify(yaml.load('host: hexlet.io\n\
timeout: 50\n\
proxy: 123.234.53.22\n\
follow: false'))).toBe(JSON.stringify({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  }))
})
/*
test('compare files', () => {
  const file1 = import.meta.dirname + '/file1.json'
  const file2 = import.meta.dirname + '/file2.json'
  expect(genDiff(file1, file2)).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}\n')
})
  */
