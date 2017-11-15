const { homedir } = require('os');
const {
    readFileSync: readFile,
	writeFileSync: writeFile,
	readdirSync: readdir
} = require('fs');
const path = require('path');

function backup(user, token) {
	const backupFile = path.join(homedir(), `.npmrc.token.${user}`);

	writeFile(backupFile, token);
}

function getList() {
	return readdir(homedir()).filter(file => file.match(/^\.npmrc\.token\./));
}

function readTokenFromFile(user) {
	return readFile(path.join(homedir(), `.npmrc.token.${user}`), 'utf8').trim();
}

module.exports = {
	backup,
	getList,
	readTokenFromFile
};