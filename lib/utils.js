const { execSync: exec } = require('child_process');
const { homedir } = require('os');
const {
    readFileSync: readFile,
    writeFileSync: writeFile
} = require('fs');
const path = require('path');

function findTokenInString(data) {
    return data.split('\n').find(line => isToken(line));
}

function replaceTokenInString(data, newToken) {
	return data = data
        .split('\n')
        .map(line => isToken(line) ? newToken : line)
        .join('\n');
}

function isToken(str) {
    return str.match(/^\/\/.*:_authToken=.+$/);
}

function writeRcFile(data) {
	const npmrcFile = path.join(homedir(), '.npmrc');

    writeFile(npmrcFile, data);
}

function readRcFile() {
    const npmrcFile = path.join(homedir(), '.npmrc');
    const data = readFile(npmrcFile, 'utf8');

    return data;
}

function whoami() {
    return exec('npm whoami', { encoding: 'utf-8' }).trim();
}

module.exports = {
	findTokenInString,
	replaceTokenInString,
	readRcFile,
	writeRcFile,
    whoami
};