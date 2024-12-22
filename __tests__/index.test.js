import result from "../__fixtures__/result.js";
import gendiff from "../src";
import path from "node:path";
import process from "node:process";
import { test, expect } from "@jest/globals";

function getResolvePath(filePath) {
    return path.resolve(process.cwd(), `__fixtures__/${filePath}`);
    // делает полный путь до файла, добавляет директорию fixtures
};

test('test file1&file2 json', () => {
    const fileA = getResolvePath('file1.json');
    const fileB = getResolvePath('file2.json');
    expect(gendiff(fileA, fileB)).toEqual(result);
});