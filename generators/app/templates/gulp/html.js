"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = function(options, page) {
  gulp.src('src/page/' + page + '/' + options.main_html)
    .pipe(gulp.dest('build/page/' + page));
  gutil.log(gutil.colors.green('Copy HTML: build/page/' + page + '/' + options.main_html));
};
