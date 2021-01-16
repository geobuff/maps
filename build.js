const fs = require('fs');
const path = require('path');
const svgson = require('svgson');

const jsFile = "./index.js";
const svgFolder = "./svgs";

fs.readdir(svgFolder, (err, files) => {
	if (err) {
		console.log(`Unable to scan directory ${svgFolder}.`, err);
		return;
	}

	checkIndex();
	files.forEach(file => {
		if (path.extname(file) === '.svg') {
			convertToJs(file);
		}
	})
});

const checkIndex = () => {
	if (fs.existsSync(jsFile)) {
		if (fs.existsSync(jsFile)) {
			try {
				fs.unlinkSync(jsFile);
			} catch (err) {
				console.error(err);
				return;
			}
		}
	}
};

const convertToJs = (file) => {
	fs.readFile(`${svgFolder}/${file}`, 'utf8', (err, data) => {
		if (err) {
			console.error(`Unable to read file ${file}.`, err);
			return;
		}

		parse(data, file);
	});
}

const parse = (data, file) => {
	svgson.parse(data)
		.then(json => {
			const svg = mapSVG(json);
			const js = `module.exports.${getClassName(file)} = ${JSON.stringify(svg)}\n\n`;
			appendToFile(js);
		})
		.catch(err => {
			console.error(`Unable to parse ${file}`, err);
		});
};

const appendToFile = (js) => {
	fs.appendFile(jsFile, js, 'utf8', err => {
		if (err) {
			console.error(`Unable to write file ${jsFile}`, err);
			return;
		}
	});
}

const mapSVG = (json) => {
	return {
		label: json.attributes['aria-label'],
		viewBox: json.attributes.viewBox,
		locations: json.children
			.filter(x => x.name === 'path')
			.map(x => ({
				name: x.attributes.name,
				id: x.attributes.id,
				path: x.attributes.d,
			}))
	};
};

const getClassName = (file) => {
	return capitalize(file.substring(0, file.indexOf('.')));
};

const capitalize = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};