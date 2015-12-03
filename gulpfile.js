var gulp = require('gulp');

// define plug-ins
var gulpFilter = require('gulp-filter');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
// Define paths variables
var dest_path =  'static/assets';
var paths = {
  scripts: ['bower_components/bootstrap/dist/js/*.js', 'bower_components/bootstrap/dist/css/*.css', 
  'bower_components/jquery/dist/*.js', 'bower_components/typeahead.js/dist/typeahead.bundle.min.js'],
};
var customJSPath = {
  customScripts: ['static/assets/js/common.js']
};
var customCSSPath = {
  customCSS: ['static/assets/css/inline.css']
};
gulp.task('js', function() {
    var jsFilter = gulpFilter('*min.js');

    return gulp.src(paths.scripts)
    .pipe(jsFilter)
    .pipe(gulp.dest(dest_path + '/js/'));
});
gulp.task('css', function() {
	 var cssFilter = gulpFilter('*min.css');

    return gulp.src(paths.scripts)
    .pipe(cssFilter)
    .pipe(gulp.dest(dest_path + '/css/'));
});
gulp.task('compressJS', function() {
     return gulp.src(customJSPath.customScripts)
    .pipe(minify({ignoreFiles: ['*min.js', '*.css']}))
    .pipe(gulp.dest(dest_path + '/js/'));
});
gulp.task('compressCSS', function() {
  return gulp.src(customCSSPath.customCSS)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(dest_path + '/css/'));
});


gulp.task('default', ['js','css', 'compressJS', 'compressCSS']);
