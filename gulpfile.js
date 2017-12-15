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
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

// FILE PATHS
var PATHS = {
	src: 'website/src',
	srcHTML: 'website/src/index.html',
	srcSCSS: 'website/src/scss/**/*.scss',
	srcJS: 'website/src/js/**/*.js',
	srcIMG: 'website/src/images/**/*.{png,jpeg,jpg,svg,gif}',

	dist: 'website/dist',
	distHTML: 'website/dist/index.html',
	distCSS: 'website/dist/css/**/*.css',
	distJS: 'website/dist/js/**/*.js',
};

// Sass task
gulp.task('sass', function() {
	return gulp.src('website/src/scss/styles.scss')
		.pipe(plumber(function(err){
			console.log('Sass task error!');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest(PATHS.dist + '/css'))
		.pipe(browserSync.stream());
});

// Scripts task
gulp.task('scripts', function() {
	return gulp.src(PATHS.srcJS)
		.pipe(plumber(function(err){
			console.log('Scripts task error!');
			console.log(err);
			this.emit('end');
		}))
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest(PATHS.dist + '/js'))
		.pipe(browserSync.stream());
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
		.pipe(gulp.dest(PATHS.dist))
		.pipe(browserSync.stream());
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
		.pipe(gulp.dest(PATHS.dist + '/images'))
		.pipe(browserSync.stream());
});

// Clean task
gulp.task('clean', function() {
	return del.sync([
		PATHS.dist
	]);
});

// Build task - build dist folder
gulp.task('build', ['clean', 'sass', 'scripts', 'inject', 'images']);

// Watch task
gulp.task('watch', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: PATHS.dist
        }
    });
    gulp.watch(PATHS.srcSCSS, ['sass']);
    gulp.watch(PATHS.srcJS, ['scripts']);
    gulp.watch(PATHS.srcIMG, ['images']);
    gulp.watch(PATHS.srcHTML, ['inject']);
});

// Default task
gulp.task('default', ['watch']);