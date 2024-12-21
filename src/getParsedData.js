import fs from 'fs';
import path from 'path';

export default function getParsedData(filePath) {
    // получаем полный путь, используя текущую рабочую директорию
    const fullPath = path.resolve(process.cwd(), filePath);
    // получаем данные из файла
    const file = fs.readFileSync(fullPath, 'utf-8');
    // парсим данные в json формат
    const data = JSON.parse(file);
    return data;
};

