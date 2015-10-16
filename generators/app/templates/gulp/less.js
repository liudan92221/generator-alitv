"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var footer = require('gulp-footer');

module.exports = function(options, page) {
  gulp.src('src/page/' + page + '/' + options.main_less)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./',{includeContent:false,sourceRoot:'../../../src/page/'+page}))
    .pipe(gulp.dest('build/page/' + page));

  gulp.src('src/page/' + page + '/' + options.main_less)
    .pipe(less())
    .pipe(minifyCss({
      compatibility: '-units.ch,-units.in,-units.pc,-units.pt,-units.vh,-units.vm,-units.vmax,-units.vmin'
    }))
    .pipe(rename({
      suffix: '-min'
    }))
    .pipe(footer('/*# sourceMappingURL='+options.main_css+'.map */'))
    .pipe(gulp.dest('build/page/' + page));
  gutil.log(gutil.colors.green('Build CSS: build/page/' + page + '/index-min.css'));
};
