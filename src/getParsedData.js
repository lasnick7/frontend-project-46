// import fs from 'fs';
// import path from 'path';

// export default function getParsedData(filePath) {
//     const stringPath = JSON.stringify(filePath).slice(1, -1);
//     // получаем полный путь, используя текущую рабочую директорию
//     const fullPath = path.resolve(process.cwd(), stringPath);

//     // console.log("Тип filePath:", typeof filePath);
//     // console.log("Значение filePath:", filePath);
//     // console.log(fullPath);

//     // получаем данные из файла
//     const file = fs.readFileSync(fullPath, 'utf-8');

//     // console.log(file);

//     // парсим данные в json формат
//     const data = JSON.parse(file);

//     // console.log(data);

//     return data;
// };

