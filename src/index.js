import fs from 'fs';
import path from 'path';

export default function fg(filePath1, filePath2) {
    // получаем полный путь, используя текущую рабочую директорию
    const fullPath1 = path.resolve(process.cwd(), filePath1);
    // получаем данные из файла
    const file1 = fs.readFileSync(fullPath1, 'utf-8');
    // парсим данные в json формат
    const data1 = JSON.parse(file1);

    const fullPath2 = path.resolve(process.cwd(), filePath2);
    const file2 = fs.readFileSync(fullPath2, 'utf-8');
    const data2 = JSON.parse(file2);
    //return [data1, data2]
};

//console.log(fg('__fixtures__/file1.json', '__fixtures__/file2.json'));