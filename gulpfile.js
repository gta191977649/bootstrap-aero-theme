var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync'),
  nodemon = require('gulp-nodemon');

gulp.task('build-theme', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(''))
});


gulp.task('watch', ['build-theme'], function() {
  gulp.watch(['scss/*.scss'], ['build-theme']);
});

gulp.task('default', ['build-theme'], function() {
});


gulp.task('browser-sync',['watch','nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["./**/*.*"],
        browser: "google chrome",
        port: 8080,
	});
});
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('run', ['browser-sync'], function() {
  
}); 