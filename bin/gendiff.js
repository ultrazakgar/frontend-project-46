import { Command } from 'commander';
const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

program
    .argument('[filepath1]')
    .argument('[filepath2]')
    //    .command('aa')
    //    .description('Split a string into substrings and display as an array')
    //.option('-V, --version', 'output the version number')
    .option('-f, --format [type]','output format')
    .option('-h, --help', 'display help for command')

program.parse();
const options = program.opts();
if(options.help)
    program.outputHelp();

if (options.debug)
   console.log(options);
