#!/usr/bin/env node
import { Command } from 'commander'
const program = new Command()
import { genDiff  } from '../src/cmp_utils.js'
import { readfile } from '../src/cmp_utils.js'

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
      // so let's out it
      let result = genDiff (readfile(this.args[0]), readfile(this.args[1]))
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
