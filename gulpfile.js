var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('website/src/scss/styles.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('website/dist/css'));
});

gulp.task('default', ['sass']);