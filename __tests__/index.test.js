import { resultStylish, resultPlain, resultJSON } from "../__fixtures__/results.js";
import gendiff from "../src";
import path from "node:path";
import process from "node:process";
import { test, expect, beforeAll } from "@jest/globals";
import { describe } from "node:test";

function getResolvePath(filePath) {
    return path.resolve(process.cwd(), `__fixtures__/${filePath}`);
    // делает полный путь до файла, добавляет директорию fixtures
};

describe('test stylish', () => {
    test('test stylish json', () => {
        const fileA = getResolvePath('file1.json');
        const fileB = getResolvePath('file2.json');
        expect(gendiff(fileA, fileB)).toEqual(resultStylish);
        expect(gendiff(fileA, fileB, 'stylish')).toEqual(resultStylish);
    });
    test('test stylish yaml', () => {
        const fileA = getResolvePath('file1.yaml');
        const fileB = getResolvePath('file2.yaml');
        expect(gendiff(fileA, fileB)).toEqual(resultStylish);
        expect(gendiff(fileA, fileB, 'stylish')).toEqual(resultStylish);
    });
    test('test stylish yml', () => {
        const fileA = getResolvePath('file1.yml');
        const fileB = getResolvePath('file2.yml');
        expect(gendiff(fileA, fileB)).toEqual(resultStylish);
        expect(gendiff(fileA, fileB, 'stylish')).toEqual(resultStylish);
    });
});

describe('test plain', () => {
    test('test plain json', () => {
        const fileA = getResolvePath('file1.json');
        const fileB = getResolvePath('file2.json');
        expect(gendiff(fileA, fileB, 'plain')).toEqual(resultPlain);
    });
    test('test plain yaml', () => {
        const fileA = getResolvePath('file1.yaml');
        const fileB = getResolvePath('file2.yaml');
        expect(gendiff(fileA, fileB, 'plain')).toEqual(resultPlain);
    });
    test('test plain yml', () => {
        const fileA = getResolvePath('file1.yml');
        const fileB = getResolvePath('file2.yml');
        expect(gendiff(fileA, fileB, 'plain')).toEqual(resultPlain);
    });
});

describe('test JSON', () => {
    test('test JSON json', () => {
        const fileA = getResolvePath('file1.json');
        const fileB = getResolvePath('file2.json');
        expect(gendiff(fileA, fileB, 'json')).toEqual(resultJSON);
    });
    test('test JSON yaml', () => {
        const fileA = getResolvePath('file1.yaml');
        const fileB = getResolvePath('file2.yaml');
        expect(gendiff(fileA, fileB, 'json')).toEqual(resultJSON);
    });
    test('test JSON yml', () => {
        const fileA = getResolvePath('file1.yml');
        const fileB = getResolvePath('file2.yml');
        expect(gendiff(fileA, fileB, 'json')).toEqual(resultJSON);
    });
});