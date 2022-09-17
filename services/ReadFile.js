const fs = require('fs');
const readFile = (fileName) => {
    const allFileContents = fs.readFileSync(fileName, 'utf-8');
    const lineCommands = [];
    allFileContents.split(/\r?\n/).forEach(line =>  {
        console.log(`Line from file: ${line}`);
        lineCommands.push(line);
    });
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return lineCommands;
}

module.exports = readFile

