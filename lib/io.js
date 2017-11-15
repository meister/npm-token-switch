const clc = require('cli-color');
const readline = require('readline');
const color = {
	highlight: clc.yellow,
	bold: clc.xterm(255),
	dark: clc.xterm(241),
	normal: clc.xterm(251)
};

function printOptions(options, current) {
	options.forEach((option, index) => {
		let line = color.bold(String(index + 1).padStart(3)) +
			color.normal(`: ${option}`);

		if (option === current) {
			line += ` ${color.dark('*')}`;
		}

		write(line);
	});
}

function write(str) {
	process.stdout.write(`${str}\n`);
}

function nl() {
	write('');
}

function prompt(options, next) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: `[1${options.length > 1 ? `..${options.length}` : ''}]> `
	});

	rl.prompt();

	rl.on('line', (line) => {
		const choice = Number(line.trim());

		rl.close();

		if (choice > 0 && choice <= options.length) {
			return next(choice);
		} else {
			return next(false);
		}
	});
}

module.exports = {
	write,
	nl,
	printOptions,
	prompt,
	color
};