var gulp = require('gulp'),
	watch = require('gulp-watch'),
	run = require('gulp-run'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config');

gulp.task('build-js', function(done) {
	return webpack(webpackConfig, function(err, stats) {
		if (err) throw err;

		done();
	});
});

gulp.task('watch', function() {
	gulp.src('src/**/*.js')
			.pipe(watch('src/**/*.js'))
			.pipe(gulp.task['build-js']);
});

gulp.task('run', ['build'], function() {
	return run('electron ./').exec();
});

gulp.task('build', ['build-js']);
gulp.task('default', ['build', 'run']);

