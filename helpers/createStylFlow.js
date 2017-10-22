const stylus = require('stylus');
const cssModulesFlowTypesPrinter = require('css-modules-flow-types-printer').default;
const {execSync} = require('child_process');
const {readFile, writeFile} = require('fs');

let files = execSync('find src -name "*.styl"', {encoding: 'utf8'}).trim();

files = files.split('\n');

files.forEach((file) => {
    readFile(file, {encoding: 'utf8'}, (err, data) => {
        if (err) {
            throw err;
        }

        stylus.render(data, {compress: true, filename: file.replace(/^.*\//, '')}, (err, css) => {
            if (err) {
                throw err;
            }

            const CSSNames = (css.match(/[:'"]?[#.][\w-]+/g) || [])
                .filter((item) => !(/^[:'"]/).test(item));

            const tokens = CSSNames.map((item) => item.slice(1));

            writeFile(`${file}.flow`, cssModulesFlowTypesPrinter(tokens), {}, () => {});
        });
    });
});
