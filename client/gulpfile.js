'use strict';

/**
 * Module includes
 */
var gulp = require('gulp');

/**
 * Compile sass-stylesheets into css-files
 */
gulp.task('styles', function() {

	return gulp.src(['styles/main.scss'])
		.pipe($.rubySass({
			style: 'expanded',
			precision: 10
		}))
		.on('error', function(err) {
			console.log(err.message);
		})
		.pipe(gulp.dest('.tmp/styles'));
});

var jslint = require('gulp-jslint');
gulp.task('jslint', function () {
  return gulp.src(['./app.js', 'controllers/*.js', 'models/*.js'])
      .pipe(jslint({
        node: true,
        vars: true,
        unparam: true,
        nomen: true,
        white: true,
        evil: true,
        errorsOnly: false,
        plusplus: true,
        bitwise: true,
        todo: true,
        stupid: true
      }));
});

/**
 * Remove the .tmp- and dist-folder
 */
gulp.task('clean', function() {

	del(['.tmp', '.sass-cache', 'dist'], function(err) {
		if(err) return console.error(err);
	});

});

/**
 * Watches for file changes and reload the browser.
 */
gulp.task('serve', ['styles'], function() {
	// watch for changes in index.html and module-partials
	gulp.watch(['index.html','scripts/**/**/*.html'], reload);

	// watch for changes in our sass/scss-files
	gulp.watch(['styles/**/*.{scss,sass}'], ['styles', reload]);

	// watch for image changes
	gulp.watch(['app/images/**/*'], reload);

});