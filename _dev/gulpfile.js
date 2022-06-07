var config = require( './config.json' );

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    sass = require("gulp-dart-sass"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    notify = require('gulp-notify'),
    dependents = require('gulp-dependents'),
    rename = require('gulp-rename'),
    touch = require('gulp-touch-cmd');
    svgmin = require('gulp-svgmin');

var minify_options = {
    ext:{
        src: '.js',
        min: '.min.js'
    },
    noSource: true,
    ignoreFiles: [ '.combo.js', '-min.js', '.min.js', '.pack.js', '.pack.min.js' ]
};

var autoprefixer_options = {
  overrideBrowserslist: [ 'last 2 versions' ]
};

var sass_options = {
  outputStyle: 'compressed'
};

const webpack = require('webpack-stream');
const webpackConfig = require( './webpack.config.js' );
const path = require( 'path' );

//-----------------------------------------
// UTILS
//-----------------------------------------

function notifier_error( error ) {
    return "line " + error.line + " in " + error.file.replace(/^.*[\\\/]/, '') + "\n" + error.message;
}

function notify_sass_compiled( file ) {
    filename = file.path.replace(/^.*[\\\/]/, '');
    return filename + ' compiled successfuly';
}

//-----------------------------------------
// GLOBAL
//-----------------------------------------
function compile_sass() {
    return gulp
        .src( 'scss/**/*.scss', { since: gulp.lastRun( compile_sass ) } )
        .pipe(dependents())
        .pipe( sass( sass_options ).on( 'error', notify.onError( notifier_error ) ) )
        .pipe( postcss( [ autoprefixer( autoprefixer_options ) ] ) )
        .pipe( notify( notify_sass_compiled ) )
        //.pipe( rename( rename_output_folder ) )
        .pipe( gulp.dest( '../assets/css/' ) )
        .pipe( touch() );
}

function watch_sass() {
    return gulp
        .watch( 'scss/**/*.scss', compile_sass )
        .on( 'change', function( file ) {
          console.log( 'File ' + file.replace(/^.*[\\\/]/, '') + ' has changed. Running tasks...' )
        } );
}

function webpack_build() {
    return gulp.src( 'js/**/*.js' )
    .pipe( webpack( webpackConfig ) )
    .pipe( gulp.dest( '../assets/js' ) );
}

function webpack_watch() {
    return gulp
        .watch( '../**/*.js', theme_webpack_build )
        .on( 'change', function( file ) {
          console.log( 'File ' + file.replace(/^.*[\\\/]/, '') + ' has changed. Running tasks...' )
        } );
}

//-----------------------------------------
// TASKS
//-----------------------------------------
gulp.task( 'sass:watch', watch_sass );
gulp.task( 'sass:compile', compile_sass );

gulp.task( 'webpack:build', webpack_build );
gulp.task( 'webpack:watch', webpack_watch );