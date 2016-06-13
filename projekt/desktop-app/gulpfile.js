'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
      server: "./"
    });

    gulp.watch("assets/sass/**/*.scss", ['sass']);
    gulp.watch("app/**/*.js").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
