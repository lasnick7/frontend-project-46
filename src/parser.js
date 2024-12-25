import yaml from 'js-yaml';

const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
};

export default function (file, format) {
    return parsers[format](file);
}