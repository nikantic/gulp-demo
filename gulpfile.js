var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var strip = require('gulp-strip-comments');
var autoprefixer = require('gulp-autoprefixer');
var del = require("del");
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegoptim = require('imagemin-jpegoptim');

// FILE PATHS
var PATHS = {
	src: 'website/src/**/*',
	srcHTML: 'website/src/index.html',
	srcSCSS: 'website/src/scss/styles.scss',
	srcJS: 'website/src/js/**/*.js',
	srcIMG: 'website/src/images/**/*.{png,jpeg,jpg,svg,gif}',

	dist: 'website/dist',
	distHTML: 'website/dist/index.html',
	distCSS: 'website/dist/css/**/*.css',
	distJS: 'website/dist/js/**/*.js',
};

// Sass task
gulp.task('sass', function() {
	return gulp.src(PATHS.srcSCSS)
		.pipe(autoprefixer())
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
		.pipe(strip())
		.pipe(gulp.dest(PATHS.dist));
});

// Images task
gulp.task('images', function() {
	return gulp.src(PATHS.srcIMG)
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngquant(),
				imageminJpegoptim({
					max: 60
				})
			]
		))
		.pipe(gulp.dest(PATHS.dist + '/images'));
});

// Clean task
gulp.task('clean', function() {
	return del.sync([
		PATHS.dist
	]);
});

gulp.task('default', ['clean', 'sass', 'scripts', 'inject', 'images']);