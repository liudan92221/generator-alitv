"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

module.exports = function(options, page) {
  gulp.task('test', function () {
    //gutil.colors.green('Copy libs: build/lib');
    return gulp
      .src('test/**/**.html')
      .pipe(mochaPhantomJS({
        reporter: 'list',
        mocha: {
          //grep: 'pattern'
        },
        phantomjs: {

        }
      }));
  });
};
