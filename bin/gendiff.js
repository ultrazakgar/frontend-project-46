#!/usr/bin/env node
import { Command } from 'commander'
const program = new Command()
import { genDiff } from '../src/cmp_utils.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')

program
  .argument('[filepath1]')
  .argument('[filepath2]')
  .option('-f, --format [type]', 'output format')
  .option('-h, --help', 'display help for command')
  .action(function () {
    try {
      // so let's out it
      const options = program.opts()
      if (this.args[0] && this.args[1])
        console.log(genDiff(this.args[0], this.args[1], options.format))
      else
        program.outputHelp()
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
// console.log(typeof true)
// const file1 = import.meta.dirname + '/../__tests__/2/file1 copy.json'
// const file2 = import.meta.dirname + '/../__tests__/2/file2 copy.json'
// console.log(compareObj(readfile(file1), readfile(file2)))
