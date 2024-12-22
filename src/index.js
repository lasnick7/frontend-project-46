import union from 'lodash.union';
import getParsedData from './getParsedData.js';

export default function gendiff(filePath1, filePath2) {
    const data1 = getParsedData(filePath1);
    const data2 = getParsedData(filePath2);

    const keys = union(Object.keys(data1), Object.keys(data2)).sort();

    const callback = (acc, key) => {
        if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
            acc.push(`    - ${key}: ${data1[key]}`);
        } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
            acc.push(`    + ${key}: ${data2[key]}`);
        } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
            if (data1[key] !== data2[key]) {
                acc.push(`    - ${key}: ${data1[key]}`);
                acc.push(`    + ${key}: ${data2[key]}`);
            } else {
                acc.push(`      ${key}: ${data2[key]}`);
            }
        }
        return acc;
    }
    const resultArray = keys.reduce(callback, ['{']);
    resultArray.push('}');
    return resultArray.join('\n');
    //return result;
};