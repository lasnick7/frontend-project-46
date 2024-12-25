#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';
import process from 'node:process';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2, options) => {
    console.log(gendiff(filePath1, filePath2, options.format));
  });

program.parse(process.argv);
