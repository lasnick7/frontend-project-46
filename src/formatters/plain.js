import flattenDeep from 'lodash.flattendeep';

function getValue(value) {
  switch (typeof value) {
    case 'object': {
      return !value ? 'null' : '[complex value]';
    }
    case 'string': {
      return `'${value}'`;
    }
    default: {
      return `${value}`;
    }
  }
}

function makePath(keys) {
  return keys.flat().join('.');
}

function makePlainDiff(tree) {
  const children = tree.children;

  const iter = (branch, path) => {
    const callback = (acc, child) => {
      const newPath = makePath([path, child.key]);
      switch (child.type) {
        case 'nested': {
          return [...acc, ...iter(child.children, newPath)];
        }
        case 'added': {
          return [
            ...acc,
            `Property '${newPath}' was added with value: ${getValue(child.value)}`,
          ];
        }
        case 'deleted': {
          return [...acc, `Property '${newPath}' was removed`];
        }
        case 'changed': {
          return [
            ...acc,
            `Property '${newPath}' was updated. From ${getValue(child.valueOld)} to ${getValue(child.valueNew)}`,
          ];
        }
        case 'unchanged': {
          return [...acc, null];
        }
        default: {
          throw new Error();
        }
      }
    };
    return branch.reduce(callback, []);
  };

  return iter(children, []);
}

export default function makePlain(data) {
  const result = makePlainDiff(data);
  return flattenDeep(result)
    .filter((element) => element)
    .join('\n');
}
