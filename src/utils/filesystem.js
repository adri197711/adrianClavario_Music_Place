const path = require('path');
const fs = require('fs');


const readJson = (file = "") => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'))
}

const saveJson = (file = "", array = []) => {
    fs.writeFileSync(path.join(__dirname, file), JSON.stringify(array, null, 2), 'utf-8')
    return null
}

const readFile = (pathFile) => {
    return fs.readFileSync(pathFile, "utf-8");
};

const writeFile = (pathFile, data) => {
    return fs.writeFileSync(pathFile, data, "utf-8");
};

const parseFile = (json) => {
    return JSON.parse(json);
}

const stringifyFile = (objeto) => {
    return JSON.stringify(objeto);
}

module.exports = {
    readFile,
    writeFile,
    parseFile,
    stringifyFile,
    saveJson,
    readJson
}