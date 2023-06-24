const { src, dest, watch, parallel } = require("gulp");
const cssClean = require('gulp-clean-css');
const del = require('del');
const fs = require('fs-extra');
const less = require('gulp-less');
const path = require('path');
const sourcemaps = require("gulp-sourcemaps");
const zip = require('gulp-zip');

// This is the version number to build
const version = 0.1

function build(cb) {

    // Copy static files first
    src([
        'src/lang/*.json',
        'src/templates/**/*.hbs',
        "src/*.json",
        "src/*.js",
        "src/modules/**/*.js"
    ])
        .pipe(dest((file) => file.base.replace("\\src", "\\dist")));
    
    // Build less file(s)
    src('src/less/token-action-hud-sfrpg.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssClean())
        .pipe(dest('dist'));

    cb();
}

function clean(cb) {
    del('dist/**', {force:true})
    cb();
}

function watchFiles(cb) {
    watch([
        'src/*.js',
        'src/**/*.js',
        'src/*.json',
        'src/**/*.json',
        'src/**/*.less',
        'src/**/*.hbs',
        '!node_modules/**'],
        parallel(build));
}

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

function getVersion() {
    const manifestPath = path.resolve(process.cwd(), './src/module.json');
    let manifest;

    if (fs.existsSync(manifestPath)) {
        manifest = fs.readJSONSync(manifestPath);
        console.log(manifest.version);
        return manifest.version;
    } else {
        return;
    }
}


function zipUp(cb) {
    const version = getVersion();

    src('./dist/**')
        .pipe(zip(`fvtt-token-action-hud-sfrpg-${version}.zip`))
        .pipe(dest('./release'));

    cb();
}


exports.build = build;
exports.clean = clean;
exports.watch = watchFiles;
exports.version = getVersion;
exports.zip = zipUp;