const fs = require('fs');
const path = require('path');
const svgson = require('svgson');

const jsFile = "./index.js";
const svgFolder = "./svgs";

let build = {};

build.checkIndex = () => {
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

build.convertToJs = (file) => {
	fs.readFile(`${svgFolder}/${file}`, 'utf8', (err, data) => {
		if (err) {
			console.error(`Unable to read file ${file}.`, err);
			return;
		}

		build.parse(data, file);
	});
}

build.parse = (data, file) => {
	svgson.parse(data)
		.then(json => {
			const svg = build.mapSVG(json);
			const js = `module.exports.${build.getClassName(file)} = ${JSON.stringify(svg)}\n\n`;
			build.appendToFile(js);
		})
		.catch(err => {
			console.error(`Unable to parse ${file}`, err);
		});
};

build.appendToFile = (js) => {
	fs.appendFile(jsFile, js, 'utf8', err => {
		if (err) {
			console.error(`Unable to write file ${jsFile}`, err);
			return;
		}
	});
}

build.mapSVG = (json) => {
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

build.getClassName = (file) => {
	const removeExt = file.substring(0, file.indexOf('.'));
	const spaces = removeExt.split("-").join(" ");
	const titleCase = build.toTitleCase(spaces);
	return titleCase.split(" ").join("");
};

build.toTitleCase = (input) => {
	return input.replace(/\w\S*/g, text => {
		return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
	});
}

fs.readdir(svgFolder, (err, files) => {
	if (err) {
		console.log(`Unable to scan directory ${svgFolder}.`, err);
		return;
	}

	build.checkIndex();
	files.forEach(file => {
		if (path.extname(file) === '.svg') {
			build.convertToJs(file);
		}
	})
});

module.exports = build;