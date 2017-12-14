var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

// FILE PATHS
var PATHS = {
	src: 'website/src/**/*',
	srcHTML: 'website/src/index.html',
	srcSCSS: 'website/src/scss/styles.scss',
	srcJS: 'website/src/js/**/*.js',

	dist: 'website/dist',
	distHTML: 'website/dist/index.html',
	distCSS: 'website/dist/css/**/*.css',
	distJS: 'website/dist/js/**/*.js'
};

// Sass task
gulp.task('sass', function() {
	return gulp.src(PATHS.srcSCSS)
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest(PATHS.dist + '/css'));
});

// Scripts task
gulp.task('scripts', function() {
	return gulp.src(PATHS.srcJS)
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest(PATHS.dist + '/js'));
});

// HTML task to copy index file
gulp.task('html-copy', function() {
	return gulp.src(PATHS.srcHTML)
		.pipe(gulp.dest(PATHS.dist));
});

// HTML injection
gulp.task('inject', ['html-copy'], function() {
	var css = gulp.src(PATHS.distCSS);
	var js = gulp.src(PATHS.distJS);
	return gulp.src(PATHS.distHTML)
		.pipe(inject(css, { relative: true }))
		.pipe(inject(js, { relative: true }))
		.pipe(gulp.dest(PATHS.dist));
});

gulp.task('default', ['sass', 'scripts', 'inject']);