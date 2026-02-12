import { Command } from 'commander'
import { readFileSync } from 'node:fs'
import { accessSync, constants } from 'node:fs'
const program = new Command()

function readfile(filename) {
  try { // testing
    accessSync(filename, constants.R_OK)
  }
  catch (err) {
    console.log (err.message)
    return null
  }
  return readFileSync(filename)
}

function compareObjects(a, b) {
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

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')

program
  .argument('[filepath1]')
  .argument('[filepath2]')
//    .command('aa')
//    .description('Split a string into substrings and display as an array')
// .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .option('-h, --help', 'display help for command')
  .action(function () {
    try {
      let o1 = readfile(this.args[0]),
        o2 = readfile(this.args[1])
      // so let's out it
      let result = compareObjects(JSON.parse(o1), JSON.parse(o2))
      console.log('{')
      for (let row of result) {
        console.log('  %s %s: %s', row.sign, row.key, row.value)
      }
      console.log('}')
    }
    catch (err) {
      console.log (err.message)
      return false
    }
  })
program.parse()
const options = program.opts()
if (options.debug)
  console.log(options)

if (options.help)
  program.outputHelp()
