import flattenDeep from "lodash.flattendeep";

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
};

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
                    acc.push(iter(child.children, newPath));
                    break;
                }
                case 'added': {
                    acc.push(`Property '${newPath}' was added with value: ${getValue(child.value)}`);
                    break;
                }
                case 'deleted': {
                    acc.push(`Property '${newPath}' was removed`);
                    break;
                }
                case 'changed': {
                    acc.push(`Property '${newPath}' was updated. From ${getValue(child.valueOld)} to ${getValue(child.valueNew)}`);
                    break;
                }
                case 'unchanged': {
                    acc.push(null);
                    break;
                }
                default: {
                    throw new Error;
                }
            }
            return acc;
        }
        return branch.reduce(callback, []);
    }
    return iter(children, []);
}

export default function makePlain(data) {
    const result = makePlainDiff(data);
    return flattenDeep(result).filter((element) => element).join('\n');
}