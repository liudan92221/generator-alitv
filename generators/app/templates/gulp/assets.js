"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = function(page) {
  gulp.src('src/page/' + page + '/assets/**')
    .pipe(gulp.dest('build/page/' + page + '/assets/'));
  gutil.log(gutil.colors.green('Copy assets: build/page/' + page + '/assets'));
};
