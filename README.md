### Hexlet tests and linter status:

[![Actions Status](https://github.com/lasnick7/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/lasnick7/frontend-project-46/actions)

[![my-check](https://github.com/lasnick7/frontend-project-46/actions/workflows/my-check.yml/badge.svg)](https://github.com/lasnick7/frontend-project-46/actions/workflows/my-check.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/a4b63e860aeb5d141c1c/maintainability)](https://codeclimate.com/github/lasnick7/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a4b63e860aeb5d141c1c/test_coverage)](https://codeclimate.com/github/lasnick7/frontend-project-46/test_coverage)

# Вычислитель отличий 

Данный проект представляет собой консольную утилиту для сравнения двух объектов. Объекты считываются только из файлов форматов JSON, YML и YAML.

# Пример работы
```bash
gendiff file1.json file2.json

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

# Установка
```bash
git clone git@github.com:lasnick7/frontend-project-46.git
cd frontend-project-46
make install
```

# Использование
```bash
gendiff [options] <filepath1> <filepath2>
```

например: gendiff -f plain file1.json file2.yaml
```bash
options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
  ```

Программа умеет выводить различия в трех форматах, по умолчанию это формат stylish. Также это могут быть plain и json. Для вывода результата согласно определенному формату введите -f [format]

```bash
gendiff -f plain file1.json file2.yaml
```

Пример такого вывода:
```bash
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
