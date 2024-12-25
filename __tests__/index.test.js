import { test, expect } from '@jest/globals';
import path from 'node:path';
import process from 'node:process';
import { describe } from 'node:test';
import {
  resultStylish,
  resultPlain,
  resultJSON,
} from '../__fixtures__/results.js';
import gendiff from '../src';

function getResolvePath(filePath) {
  return path.resolve(process.cwd(), `__fixtures__/${filePath}`);
  // делает полный путь до файла, добавляет директорию fixtures
}

describe('test all', () => {
  test('json', () => {
    const fileA = getResolvePath('file1.json');
    const fileB = getResolvePath('file2.json');
    expect(gendiff(fileA, fileB)).toEqual(resultStylish);
    expect(gendiff(fileA, fileB, 'stylish')).toEqual(resultStylish);
    expect(gendiff(fileA, fileB, 'plain')).toEqual(resultPlain);
    expect(gendiff(fileA, fileB, 'json')).toEqual(resultJSON);
  });
  test('yaml', () => {
    const fileA = getResolvePath('file1.yaml');
    const fileB = getResolvePath('file2.yaml');
    expect(gendiff(fileA, fileB)).toEqual(resultStylish);
    expect(gendiff(fileA, fileB, 'stylish')).toEqual(resultStylish);
    expect(gendiff(fileA, fileB, 'plain')).toEqual(resultPlain);
    expect(gendiff(fileA, fileB, 'json')).toEqual(resultJSON);
  });
  test('yml', () => {
    const fileA = getResolvePath('file1.yml');
    const fileB = getResolvePath('file2.yml');
    expect(gendiff(fileA, fileB)).toEqual(resultStylish);
    expect(gendiff(fileA, fileB, 'stylish')).toEqual(resultStylish);
    expect(gendiff(fileA, fileB, 'plain')).toEqual(resultPlain);
    expect(gendiff(fileA, fileB, 'json')).toEqual(resultJSON);
  });
});
