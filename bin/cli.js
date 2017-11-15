#!/usr/bin/env node

const utils = require('../lib/utils');
const token = require('../lib/token');
const io = require('../lib/io');

const data = utils.readRcFile();
const me = utils.whoami();

io.write(`You're currently logged in as ${io.color.highlight(me)}.`);

const currentToken = utils.findTokenInString(data);

if (currentToken) {
	io.write(`Backing up token to ${io.color.highlight(`.npmrc.token.${me}`)}`);
	token.backup(me, currentToken);
}

const tokens = token.getList();
const options = tokens.map(token => token.substr(13));

io.write(`Change to different token? ${io.color.dark('(ENTER to skip)')}\n`);
io.printOptions(options, me);
io.nl();
io.prompt(options, (choice) => {
	if (false === choice || options[choice - 1] === me) {
		io.write('\nKeeping current user.');
		process.exit(0);
	}

	const newUser = options[choice - 1];

	io.write(`\nSwitching to user ${io.color.highlight(newUser)}.`);

	const newToken = token.readTokenFromFile(newUser);

	utils.writeRcFile(utils.replaceTokenInString(data, newToken));
});