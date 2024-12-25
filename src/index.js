import getParsedData from './getParsedData.js';
import formatter from './formatters/formatter.js';
import getTree from './buildTree.js';

export default function gendiff(filePath1, filePath2, format = 'stylish') {
  const data1 = getParsedData(filePath1);
  const data2 = getParsedData(filePath2);

  return formatter(getTree(data1, data2), format);
  // return result;
}
