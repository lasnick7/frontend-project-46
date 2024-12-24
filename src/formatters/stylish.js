const indent = ' ';
const indentSize = 4;

function currentIndent(depth) {
    return indent.repeat(indentSize * depth - 2);
}

function braceIndent(depth) {
    return indent.repeat(indentSize * depth - indentSize);
}

function joinStrings(lines, depth) {
    return [
        '{',
        ...lines,
        `${braceIndent(depth)}}`,
    ].join('\n');
}

function stringify(data, depth) {
    if (typeof data !== 'object' || data === null) {
        return String(data);
    }
    const keys = Object.keys(data);
    if (keys.length === 0) {
        return '{}';
    }
    const lines = keys.map((key) => {
        const value = stringify(data[key], depth + 1);
        return `${currentIndent(depth)}  ${key}: ${value}`;
    });
    return joinStrings(lines, depth);
}

export default function makeStylish(tree) {
    const iter = (branch, depth) => {
        switch (branch.type) {
            case 'root': {
                const line = branch.children.flatMap((child) => iter(child, depth));
                return joinStrings(line, depth);
            }
            case 'nested': {
                const childrenString = branch.children.flatMap((child) => iter(child, depth + 1));
                return `${currentIndent(depth)}  ${branch.key}: ${joinStrings(childrenString, depth + 1)}`;
            }
            case 'added': {
                return `${currentIndent(depth)}+ ${branch.key}: ${stringify(branch.value, depth + 1)}`;
            }
            case 'deleted': {
                return `${currentIndent(depth)}- ${branch.key}: ${stringify(branch.value, depth + 1)}`;
            }
            case 'changed': {
                return `${currentIndent(depth)}- ${branch.key}: ${stringify(branch.valueOld, depth + 1)}\n${currentIndent(depth)}+ ${branch.key}: ${stringify(branch.valueNew, depth + 1)}`;
            }
            case 'unchanged': {
                return `${currentIndent(depth)}  ${branch.key}: ${stringify(branch.value, depth + 1)}`
            }
            default: {
                throw new Error;
            }
        }
    }
    return iter(tree, 1);
} 