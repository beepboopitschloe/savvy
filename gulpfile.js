var gulp = require('gulp'),
	run = require('gulp-run'),
	copy = require('gulp-copy'),
	babel = require('gulp-babel');

gulp.task('transpile', function() {
	return gulp.src('src/**/*.js')
			.pipe(babel())
			.pipe(gulp.dest('build'));
});

gulp.task('copy-package', function() {
	return gulp.src('package.json')
			.pipe(copy('build'));
});

gulp.task('copy-html', function() {
	return gulp.src('tpl/**/*.html')
			.pipe(copy('build'));
});

gulp.task('run', ['build'], function() {
	return run('electron ./build').exec();
});

gulp.task('build', ['transpile', 'copy-package', 'copy-html']);
gulp.task('default', ['build']);

