"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

module.exports = function(options, page) {
  gulp.src('src/page/' + page + '/' + options.main_less)
    .pipe(less())
    .pipe(minifyCss({
      compatibility: '-units.ch,-units.in,-units.pc,-units.pt,-units.vh,-units.vm,-units.vmax,-units.vmin'
    }))
    .pipe(rename({
      suffix: '-min'
    }))
    .pipe(gulp.dest('build/page/' + page));
  gutil.log(gutil.colors.green('Build CSS: build/page/' + page + '/index-min.css'));
};
