#!/usr/bin/env node

const fs = require('fs');

let cmds = process.argv.slice(2);

function wcat(cmds) {
	let options = cmds.filter(function (data, idx) {
		return data.startsWith('-');
	});

	let filename = cmds.filter(function (data, idx) {
		return !data.startsWith('-');
	});

	if (filename.length == 0) {
		console.log('Please specify a filename to read!');
		return;
	}

	for (i in filename) {
		if (!fs.existsSync(filename[i])) {
			console.log('Wrong file name');
			return;
		}
	}
	// Writing commands
	if (options.includes('-w')) {
		if (filename.length != 2 || cmds.indexOf('-w') != 1 || options.length != 1) {
			console.log('Command not found');
			return;
		}

		let data = fs.readFileSync(filename[0], 'utf-8');
		fs.writeFileSync(filename[1], data);
		return;
	}

	if (options.includes('-a')) {
		if (filename.length != 2 || cmds.indexOf('-a') != 1 || options.length != 1) {
			console.log('Command not found');
			return;
		}

		let data = fs.readFileSync(filename[0], 'utf-8');
		let data2 = fs.readFileSync(filename[1], 'utf-8');
		fs.writeFileSync(filename[1], data2 + '\r\n' + data);
		return;
	}

	if (options.includes('-ws')) {
		if (filename.length != 2 || cmds.indexOf('-ws') != 1 || options.length != 1) {
			console.log('Command not found');
			return;
		}

		let data = fs.readFileSync(filename[0], 'utf-8').split('\r\n');
		let alltext = '';
		for (i in data) {
			if (data[i] != '') {
				alltext += data[i] + '\n';
			}
		}
		fs.writeFileSync(filename[1], alltext.slice(0, alltext.length - 1));
		return;
	}

	// Reading commands
	for (i in filename) {
		if (options.includes('-s')) {
			let data = fs.readFileSync(filename[i], 'utf-8');
			data = data.split('\r\n');
			let cnt = 1;
			for (j in data) {
				if (data[j] != '') {
					if (options.includes('-n') || options.includes('-b')) {
						console.log(cnt + '. ' + data[j]);
						cnt++;
					} else {
						console.log(data[j]);
					}
				}
			}
		} else if (options.includes('-n') && options.includes('-b') && options.indexOf('-n') < options.indexOf('-b')) {
			let data = fs.readFileSync(filename[i], 'utf-8').split('\r\n');
			let cnt = 1;
			for (j in data) {
				console.log(cnt + '. ' + data[j]);
				cnt++;
			}
		} else if (options.includes('-b')) {
			let data = fs.readFileSync(filename[i], 'utf-8');
			let lines = data.split('\r\n');

			let cnt = 1;
			for (let j in lines) {
				if (lines[j] != '') {
					console.log(cnt + '. ' + lines[j]);
					cnt++;
				} else {
					console.log();
				}
			}
		} else {
			let data = fs.readFileSync(filename[i], 'utf-8');
			console.log(data);
		}
	}
}
wcat(cmds);
