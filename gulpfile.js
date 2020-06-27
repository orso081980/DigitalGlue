"use strict";

const {src, dest, series, parallel, watch} = require('gulp');
const destination = 'css/';
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const origin = 'scss';

sass.compiler = require('node-sass');

function compileSass(cb) {

	src(`${origin}/style.scss`)
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(sourcemaps.write())
	.pipe(dest(`${destination}`));
	cb();
}


function watcher(cb) {
	watch(`${origin}/**/*.scss`).on('change', series(compileSass))
	cb();
}


exports.compileSass = compileSass;
exports.default = series(parallel(compileSass), watcher);