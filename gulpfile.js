const { src, dest, watch, parallel } = require("gulp");
const less = require('gulp-less');
 
function buildLess(cb) {
    cb();
}

function build(cb) {
    src('src/**.js').pipe(dest('dist'));
    cb();
}

function clean(cb) {
    cb();
}

function watchFiles(cb) {
    watch([ 'src/**.js', '!node_modules/**'], parallel(build));
}


exports.build = build;
exports.clean = clean;
exports.watch = watchFiles;