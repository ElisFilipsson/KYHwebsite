'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    gutil       = require('gulp-util'),
    browserify  = require('gulp-browserify'),
    concat      = require('gulp-concat'),
    clean       = require('gulp-clean');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/assets/sass/*.scss", ['sass']);
    gulp.watch('src/app/**/*.js',['browserify']).on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/assets/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("build/assets/css"))
        .pipe(browserSync.stream());
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['src/app/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('build/js'));
});

gulp.task('default', ['serve']);