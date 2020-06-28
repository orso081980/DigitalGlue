"use strict";

const {src, dest, series, parallel, watch} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const destination = 'css/';
const origin = 'scss';
const origines6 = 'es6';
const destinationes6 = 'js/';

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

function js(cb) {
	src(`${origines6}/main.js`)
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(dest(`${destinationes6}`))
	cb();
}


function watcher(cb) {
	watch(`${origin}/**/*.scss`).on('change', series(compileSass))
	watch(`${origin}/**/*.js`).on('change', series(js))
	cb();
}


exports.compileSass = compileSass;
exports.default = series(parallel(compileSass, js), watcher);