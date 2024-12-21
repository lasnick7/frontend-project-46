import union from 'lodash.union';
import fs from 'fs';
import path from 'path';
// import getParsedData from './getParsedData.js';

export default function gendiff(filePath1, filePath2) {
    const cwd = String(process.cwd());
    filePath1 = String(filePath1);
    filePath2 = String(filePath2);

    console.log("filePath1:", filePath1);
    console.log("filePath2:", filePath2);

    const fullPath1 = path.resolve(cwd, filePath1);
    const fullPath2 = path.resolve(cwd, filePath2);

    const file1 = fs.readFileSync(fullPath1, 'utf-8');
    const file2 = fs.readFileSync(fullPath2, 'utf-8');

    const data1 = JSON.parse(file1);
    const data2 = JSON.parse(file2);

    const keys = union(Object.keys(data1), Object.keys(data2));

    const callback = (acc, key) => {
        if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
            acc.push(`  - ${key}: ${data1[key]}`);
        } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
            acc.push(`  + ${key}: ${data2[key]}`);
        } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
            if (data1[key] !== data2[key]) {
                acc.push(`  - ${key}: ${data1[key]}`);
                acc.push(`  + ${key}: ${data2[key]}`);
            } else {
                acc.push(`    ${key}: ${data2[key]}`);
            }
        }
        return acc;
    }
    const resultArray = keys.reduce(callback, ['{']).push('}');
    return resultArray.join('\n');

};