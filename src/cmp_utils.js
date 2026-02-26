import * as yaml from 'js-yaml'
import { readFileSync } from 'node:fs'
import { accessSync, constants } from 'node:fs'
import { extname } from 'path'

/**
 *  so read file and convert it from json or yaml format
 */
function readfile(filename, format) {
  try { // testing
    accessSync(filename, constants.R_OK)
  }
  catch (err) {
    //console.log (err.message)
    return null
  }
  if (!format) {
    format = extname(filename)
  }

  if (format === 'json' || format === '.json')
    return JSON.parse(readFileSync(filename))
  else if (format === 'yml' || format === '.yml')
    return yaml.load(readFileSync(filename))
  return readFileSync(filename)
}

function compareObj(a, b) {
  let isPlain = a => typeof a == 'string' || typeof a == 'number'  || typeof a == 'boolean' || a === null
  function value(a) {
    if (a === null) return 'null'
    return isPlain(a) ? a : comparePlain(a, a)
  }
  
  function compareSingle(a, b, i, result) {
    if (a === b) {
      result.push({ sign: ' ', key: i, value: value(b) })
    }
    else if (isPlain(a) || isPlain(b)) {
      result.push({ sign: '-', key: i, value: value(a) })
      result.push({ sign: '+', key: i, value: value(b) })
    }
    else {
      result.push({ sign: ' ', key: i, value: comparePlain(a, b, i) })
    }
  }
  function comparePlain(a, b, i) {
    let result = []

    if (isPlain(a) || isPlain(b)) {
      result.push({ sign: '-', key: i, value: value(a) })
      result.push({ sign: '+', key: i, value: value(b) })
    }
    else {
      let sum = [...new Set(Object.keys(a).concat(Object.keys(b)))].sort()
      //console.log(a, b, sum)
      for (let i of sum) {
        if ( i in a) {
          if ( i in b) {
            compareSingle(a[i], b[i], i, result)
          }
          else {
            result.push({ sign: '-', key: i, value: value(a[i]) })
          }
        }
        else {
          result.push({ sign: '+', key: i, value: value(b[i]) })
        }
      }
    }

    return result
  }
  return comparePlain(a, b, '')
}

function printjson(result, tab_count = 0) {
  const notab = 1, nonl = 2
  function line(msg, flag = 0) {
    return (flag & notab ? '' : '  '.repeat(tab_count)) + msg + (flag & nonl ? '' : '\n')
  }
  let input_plain_format = line('{', notab)
  tab_count++
  for (let row of result) {
    if (Array.isArray(row.value))
      input_plain_format += line(`${row.sign} ${row.key}: ${printjson(row.value, tab_count + 1)}`)
    else
      input_plain_format += line(`${row.sign} ${row.key}: ${row.value}`)
  }
  tab_count--
  input_plain_format += line('}', nonl)
  return input_plain_format
}

function genDiff(file1, file2, format) {
  let data1=readfile(file1), data2=readfile(file2)
  if(!data1) return 'file not found';
  if(!data2) return 'file not found';
  let result = compareObj (data1, data2)
  if (!format) format = 'json'
  if (format === 'json')
    return printjson(result)

  return 'format unrecognised'
}

export { readfile, compareObj, genDiff, printjson }
