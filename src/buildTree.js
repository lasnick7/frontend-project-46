import union from 'lodash.union';
import isPlainObject from 'lodash.isplainobject';

function buildTree(data1, data2) {
  const keys = union(Object.keys(data1), Object.keys(data2)).toSorted();

  const callback = (acc, key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      acc = acc.concat({
        type: 'deleted',
        key,
        value: data1[key],
      });
    } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      acc = acc.concat({
        type: 'added',
        key,
        value: data2[key],
      });
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
        acc = acc.concat({
          type: 'nested',
          key,
          children: buildTree(data1[key], data2[key]),
        });
      } else if (data1[key] !== data2[key]) {
        acc = acc.concat({
          type: 'changed',
          key,
          valueOld: data1[key],
          valueNew: data2[key],
        });
      } else {
        acc = acc.concat({
          type: 'unchanged',
          key,
          value: data2[key],
        });
      }
    }
    return acc;
  };

  const resultTree = keys.reduce(callback, []);
  return resultTree;
}

export default function getTree(data1, data2) {
  return {
    type: 'root',
    children: buildTree(data1, data2),
  };
}
// const d1 = {
//     "common": {
//         "setting1": "Value 1",
//         "setting2": 200,
//         "setting3": true,
//         "setting6": {
//             "key": "value",
//             "doge": {
//                 "wow": ""
//             }
//         }
//     },
//     "group1": {
//         "baz": "bas",
//         "foo": "bar",
//         "nest": {
//             "key": "value"
//         }
//     },
//     "group2": {
//         "abc": 12345,
//         "deep": {
//             "id": 45
//         }
//     }
// };
// const d2 = {
//     "common": {
//         "follow": false,
//         "setting1": "Value 1",
//         "setting3": null,
//         "setting4": "blah blah",
//         "setting5": {
//             "key5": "value5"
//         },
//         "setting6": {
//             "key": "value",
//             "ops": "vops",
//             "doge": {
//                 "wow": "so much"
//             }
//         }
//     },
//     "group1": {
//         "foo": "bar",
//         "baz": "bars",
//         "nest": "str"
//     },
//     "group3": {
//         "deep": {
//             "id": {
//                 "number": 45
//             }
//         },
//         "fee": 100500
//     }
// };

// console.log(getTree(d1, d2));
