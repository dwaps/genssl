const {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} = require('fs');
const scriptGentls = require('./script-to-include');
const debugGentls = require('util').debuglog('gentls');
const { dirname } = require('path');

let { outputFilepath, hasOutputFilepath } = require('./get-args');

if (hasOutputFilepath && existsSync(outputFilepath)) {
  debugGentls("File exists");
  const content = readFileSync(outputFilepath, { encoding: 'utf-8' });
  writeIntoFile(scriptGentls+content);
}
else if (hasOutputFilepath) {
  debugGentls("File not exists");
  const folderpath = dirname(outputFilepath);
  try {
    mkdirSync(folderpath);
  }
  catch (e) {}
  finally {
    writeIntoFile(scriptGentls);
  }
}

function writeIntoFile(content) {
  writeFileSync(
    outputFilepath,
    content,
    { encoding: 'utf-8' }
  );
}
