#!/usr/bin/env node
import { Command } from 'commander'
import { readfile } from '../src/cmp_utils.js'
import { compareObj } from '../src/cmp_utils.js'
import { printjson } from '../src/cmp_utils.js'
import {existsSync } from 'fs'
const program = new Command()

export default function genDiff(file1, file2, format) {
  let data1 = readfile(file1), data2 = readfile(file2)
  if (!data1) return 'file not found'
  if (!data2) return 'file not found'
  let result = compareObj (data1, data2)
  if (!format) format = 'json'
  if (format === 'json')
    return printjson(result)

  return `${format} unrecognised ${file1} ${file2}`
}

function try2find(name, def){
  if(existsSync(name)) return name;
  if(existsSync(def)) return def;
}

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
        //try2find files



        console.log(genDiff(try2find(this.args[0],'file1.json'), try2find(this.args[1],'file2.json'), options.format))
      else {
        program.outputHelp()
        options.help = false;
      }
    }
    catch (err) {
      console.log (err.message)
      return false
    }
  })
program.parse()
const options = program.opts()
//if (options.debug)
//  console.log(program.opts(), program.args)

if (options.help)
  program.outputHelp()
// console.log(typeof true)
// const file1 = import.meta.dirname + '/../__tests__/2/file1 copy.json'
// const file2 = import.meta.dirname + '/../__tests__/2/file2 copy.json'
// console.log(compareObj(readfile(file1), readfile(file2)))
export { genDiff }