#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
// .arguments('<filepath1> <filepath2>')
// .action((filepath1, filepath2) => {
//     console.log(`Comparing ${filepath1} with ${filepath2}`);
//     // логика для сравнения файлов
// });

program.parse(process.argv);