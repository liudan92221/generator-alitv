"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');

module.exports = function(options, page) {
  var entry = {};
  entry[page] = './src/page/' + page + '/' + options.main_js;

  // webpack配置
  var cfg = {
    cache: true,
    entry: entry,
    output: {
      path: './build/page',
      filename: '[name]/index.js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }]
    },
    plugins: [new webpack.optimize.DedupePlugin()]
  };


  webpack(cfg, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    // 压缩webpack生成的js文件
    gulp.src('build/page/' + page + '/index.js')
      .pipe(uglify({
        output: {
          ascii_only: true
        }
      }))
      .pipe(rename({
        suffix: '-min'
      }))
      .pipe(gulp.dest('build/page/' + page));
    gutil.log(gutil.colors.green('Minify JS: build/page/' + page + '/index-min.js'));
  });
};
