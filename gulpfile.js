var gulp = require('gulp'),
	watch = require('gulp-watch'),
	run = require('gulp-run'),
	less = require('gulp-less'),
	webpack = require('webpack'),
	path = require('path'),
	webpackConfig = require('./webpack.config');

gulp.task('build-css', function() {
	return gulp.src('./less/style.less')
		.pipe(less({
			paths: [
				path.join(__dirname, 'less', 'includes')
			]
		}))
		.pipe(gulp.dest('build'));
});

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

	gulp.src('less/**/*.less')
			.pipe(watch('less/**/*.less'))
			.pipe(gulp.task['build-css']);

	gulp.task.run();
});

gulp.task('run', ['build'], function() {
	return run('electron ./').exec();
});

gulp.task('build', ['build-js', 'build-css']);
gulp.task('default', ['build', 'run']);
