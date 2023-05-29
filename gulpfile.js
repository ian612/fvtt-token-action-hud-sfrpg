const gulp = require('gulp');
const less = require('gulp-less');

const $ = require("jquery")(window);

function getConfig() {
    const configPath = path.resolve(process.cwd(), 'foundryconfig.json');
    let config;

    if (fs.existsSync(configPath)) {
        config = fs.readJSONSync(configPath);
        return config;
    } else {
        return;
    }
}

function getManifest() {
    const json = {};

    if (fs.existsSync('src')) {
        json.root = 'src';
    } else {
        json.root = 'dist';
    }

    const modulePath = path.join(json.root, 'module.json');
    const systemPath = path.join(json.root, 'system.json');

    if (fs.existsSync(modulePath)) {
        json.file = fs.readJSONSync(modulePath);
        json.name = 'module.json';
    } else if (fs.existsSync(systemPath)) {
        json.file = fs.readJSONSync(systemPath);
        json.name = 'system.json';
    } else {
        return;
    }

    return json;
}

/** ******************/
/*		BUILD		*/
/** ******************/

/**
 * Build Less
 */
async function buildLess() {
    const name = 'sfrpg';

    return gulp
        .src(`src/less/${name}.less`)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssClean())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
}

/**
 * Copy static files
 */
async function copyFiles() {

    // Build static files first
    gulp.src([
        'src/fonts/*',
        'src/icons/*',
        'src/icons/**/*',
        'src/images/**/*',
        'src/images/*',
        'src/lang/*.json',
        'src/packs/*.db',
        'src/templates/**/*.hbs',
        "src/*.json"
    ])
        .pipe(gulp.dest((file) => file.base.replace("\\src", "\\dist")));

    // Then pipe in js files to be minified
    gulp.src('src/sfrpg.js')
        .pipe(sourcemaps.init())
        // Minify the JS
        .pipe(terser({
            ecma: 2022,
            compress: {
                module: true
            }
        }))
        .pipe(sourcemaps.write('./maps'))
        // Output
        .pipe(gulp.dest('dist'));

    return gulp.src([
        'src/module/**/*.js',
        'src/module/*.js'
    ])
        .pipe(sourcemaps.init())
        // Minify the JS
        .pipe(terser({
            ecma: 2022,
            compress: {
                module: true
            }
        }))
        .pipe(sourcemaps.write('.././maps/module'))
        // Output
        .pipe(gulp.dest('dist/module'));

}

/** ******************/
/*   LOCALIZATION   */
/** ******************/
async function copyLocalization() {
    console.log(`Opening localization files`);

    const itemSourceDir = "./src/lang";
    const files = fs.readdirSync(itemSourceDir);

    // First we sort the JSON keys alphabetically
    console.log(`Sorting keys`);
    for (const filePath of files) {
        console.log(`> ${filePath}`);
        const fileRaw = fs.readFileSync(itemSourceDir + "/" + filePath);
        const fileJson = JSON.parse(fileRaw);

        const outRaw = JSONstringifyOrder(fileJson, 4);
        fs.writeFileSync(itemSourceDir + "/" + filePath, outRaw);
    }
    console.log(``);

    // Get original file data
    const englishFilePath = "./src/lang/en.json";
    const englishRaw = fs.readFileSync(englishFilePath);
    const englishJson = JSON.parse(englishRaw);

    const germanFilePath = "./src/lang/de.json";
    const germanRaw = fs.readFileSync(germanFilePath);
    const germanJson = JSON.parse(germanRaw);

    // Then we ensure all languages are in sync with English
    console.log(`Ensuring language files are in sync with English`);
    for (const filePath of files) {
        const isEnglish = filePath.includes("en.json");
        if (isEnglish) {
            continue;
        }

        console.log(`> ${filePath}`);

        const languageRaw = fs.readFileSync(itemSourceDir + "/" + filePath);
        const languageJson = JSON.parse(languageRaw);

        let copiedJson = JSON.parse(JSON.stringify(englishJson));
        mergeDeep(copiedJson, languageJson);

        const outRaw = JSONstringifyOrder(copiedJson, 4);
        fs.writeFileSync(itemSourceDir + "/" + filePath, outRaw);
    }
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

exports.build = gulp.series(clean, execBuild);
exports.copyLocalization = copyLocalization;