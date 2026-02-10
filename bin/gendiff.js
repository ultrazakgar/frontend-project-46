import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { accessSync, constants } from 'node:fs';
const program = new Command();

function readfile(filename){
        let valid = true;
        try{ // testing
            accessSync(filename, constants.R_OK)
        } catch (err){
            valid = false;
            console.log (err.message);
            return null;
        }
        return readFileSync(filename);
}

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
    .action(function() {
        try{ 
            let o1 = readfile(this.args[0]),
            o2=readfile(this.args[1]);
                console.error('Run script %s on port %s - %s -%s', this.args[0], 
                    JSON.stringify(this.opts()),o1,o2);
        } catch (err){
            console.log (err.message);
            return false;
        }
   });
program.parse();
const options = program.opts();
if (options.debug)
   console.log(options);

if(options.help)
    program.outputHelp();

// macOS, Linux, and Windows
//readFileSync('<directory>');
