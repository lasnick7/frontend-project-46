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
    const iter = (branch, acc) => {
        const callback = (child) => {
            const path = makePath([acc, child.key]);
            switch (child.type) {
                case 'nested': {
                    return iter(child.children, path);
                }
                case 'added': {
                    return `Property '${path}' was added with value: ${getValue(child.value)}`
                }
                case 'deleted': {
                    return `Property '${path}' was removed`;
                }
                case 'changed': {
                    return `Property '${path}' was updated. From ${getValue(child.valueOld)} to ${getValue(child.valueNew)}`;
                }
                case 'unchanged': {
                    return null;
                }
                default: {
                    throw new Error;
                }
            }
        }
        return branch.map((child) => callback(child));
    }
    return iter(children, [])
}

export default function makePlain(data) {
    const result = makePlainDiff(data);
    return flattenDeep(result).filter((element) => element).join('\n');
}