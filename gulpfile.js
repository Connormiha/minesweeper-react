'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const stylint = require('gulp-stylint');
const {execSync} = require('child_process');

const PRE_COMMIT = process.env.NODE_ENV === 'pre_commit';

let changedFiles;
let changedFilesJavascript;
let changedFilesStylus;

if (PRE_COMMIT) {
    changedFiles = execSync('git diff --cached --name-only --diff-filter=ACM src __tests__', {encoding: 'utf8'});
    changedFiles = changedFiles.split('\n');
    changedFilesJavascript = changedFiles.filter((item) => /\.jsx?$/.test(item) && !/\.d\.ts$/.test(item));
    changedFilesStylus = changedFiles.filter((item) => /\.styl$/.test(item));
}

/**
 *
 * @desc Check JavaScript validation
 */
gulp.task('eslint', () =>
    gulp.src(PRE_COMMIT ? changedFilesJavascript : ['{src,__tests__}/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

/**
 *
 * @desc Check stylus validation
 */
gulp.task('styluslint', () =>
    gulp.src(PRE_COMMIT ? changedFilesStylus : ['src/**/*.styl'])
        .pipe(stylint())
        .pipe(stylint.reporter())
        .pipe(stylint.reporter('fail', {failOnWarning: PRE_COMMIT}))
);

/**
* validation Stylus and TypeScript
*/
gulp.task('lint', ['eslint', 'styluslint']);
