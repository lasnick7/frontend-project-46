import fs from 'fs';
import path from 'path';
import process from 'node:process';
import parser from './parser.js';

function getExtension(filename) {
  return path.extname(filename).slice(1);
}

export default function getParsedData(filePath) {
  // получаем полный путь, используя текущую рабочую директорию
  const fullPath = path.resolve(process.cwd(), filePath);
  // получаем данные из файла
  const file = fs.readFileSync(fullPath, 'utf-8');
  // получаем формат
  const extension = getExtension(filePath);
  // парсим данные  в зависимости от формата
  const data = parser(file, extension);
  return data;
}
