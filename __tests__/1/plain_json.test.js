// @ts-check

import { expect, test } from '@jest/globals'
import { compareObjects } from '../../src/cmp_utils.js'
import { readfile } from '../../src/cmp_utils.js'
import * as yaml from 'js-yaml'
import { extname } from 'path';


test('ext', () => {
  expect(extname('file.json')).toBe('.json')
})
test('plain_json', () => {
  expect(JSON.stringify(compareObjects({ a: 1 }, { a: 1 }))).toBe(JSON.stringify([{ sign: ' ', key: 'a', value: 1 }]))
})
test('readjson', () => {
  expect(JSON.stringify(readfile('file1.json'))).toBe(JSON.stringify({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  }))
})
test('readyaml', () => {
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
