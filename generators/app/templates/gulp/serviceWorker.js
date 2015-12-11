"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var footer = require('gulp-footer');
var fs = require('fs');

module.exports = function(options) {
  var entry = {};
  var buildFile = 'index';
  var swFile = 'service-worker';
  var exists = fs.existsSync(path.join(__dirname, '../src/page/' + swFile + '/'+buildFile+'.js'));
  if (exists) {
    entry[swFile] = './src/page/' + swFile + '/' + options.main_js;
  }
  // webpack配置
  var cfg = {
    cache: true,
    entry: entry,
    output: {
      path: './build/page',
      filename: '[name]/'+buildFile+'.js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel'
      }]
    },
    devtool: 'source-map',
    plugins: [new webpack.optimize.DedupePlugin()]
  };


  webpack(cfg, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    // 压缩webpack生成的js文件
    fs.exists(path.join(__dirname, '../build/page/' + swFile + '/'+buildFile+'.js'), function(exists) {
      if (!exists) {return;}
      gulp.src('build/page/' + swFile + '/'+buildFile+'.js')
        .pipe(uglify({
          output: {
            ascii_only: true
          }
        }))
        .pipe(rename({
          suffix: '-min'
        }))
        .pipe(footer('//# sourceMappingURL='+options.main_js+'.map'))
        .pipe(gulp.dest('build/page/' + swFile));
      gutil.log(gutil.colors.green('Minify JS: build/page/' + swFile + '/'+buildFile+'-min.js'));
    });
  });
  gulp.src('src/page/' + swFile + '/' + options.main_html)
    .pipe(gulp.dest('build/page/' + swFile));
  gulp.src('src/page/' + swFile +'.js')
    .pipe(gulp.dest('build/page'));
};
