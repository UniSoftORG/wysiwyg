const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets/css/';
const outputDir = 'dist/assets/css/';

fs.mkdirSync(outputDir, { recursive: true });

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.css') {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);

            fs.readFile(inputPath, 'utf8', (err, cssString) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const output = new CleanCSS({}).minify(cssString);

                fs.writeFile(outputPath, output.styles, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    console.log(`Minified ${file}`);
                });
            });
        }
    });
});
