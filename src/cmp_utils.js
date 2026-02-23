import * as yaml from 'js-yaml'
import { readFileSync } from 'node:fs'
import { accessSync, constants } from 'node:fs'
import { extname } from 'path';

/**
 *  so read file and convert it from json or yaml format
 */
function readfile(filename, format) {
  try { // testing
    accessSync(filename, constants.R_OK)
  }
  catch (err) {
    console.log (err.message)
    return null
  }
  if (!format) {
  format =extname(filename);
  }

  if (format === 'json' || format === '.json')
    return JSON.parse(readFileSync(filename))
  else if (format === 'yml' || format === '.yml')
    return yaml.safeLoad(readFileSync(filename))
  return readFileSync(filename)
}

function genDiff (a, b) {
  let sum = [...new Set(Object.keys(a).concat(Object.keys(b)))].sort(), result = []
  for (let i of sum) {
    if (i in a) {
      if (i in b) {
        if (a[i] === b[i]) {
          result.push({ sign: ' ', key: i, value: b[i] })
        }
        else {
          result.push({ sign: '-', key: i, value: a[i] })
          result.push({ sign: '+', key: i, value: b[i] })
        }
      }
      else {
        result.push({ sign: '-', key: i, value: a[i] })
      }
    }
    else {
      result.push({ sign: '+', key: i, value: b[i] })
    }
  }
  return result
}

export { readfile, genDiff }
