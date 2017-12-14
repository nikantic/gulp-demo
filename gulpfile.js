var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Sass task
gulp.task('sass', function() {
	return gulp.src('website/src/scss/styles.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('website/dist/css'));
});

// Scripts task
gulp.task('scripts', function() {
	return gulp.src('website/src/js/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('website/dist/js'));
});

gulp.task('default', ['sass', 'scripts']);