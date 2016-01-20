"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

var gulpMap = {
  'html': require('./html'),
  'less': require('./less'),
  'webpack': require('./webpack'),
  'lib': require('./lib'),
  'assets': require('./assets')
};
// 从sudo降权，避免build后的文件为root权限
function unRoot() {

  if (process.setgid && process.setuid) {
    var env = process.env,
      uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
      gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);
    process.setgid(gid);
    process.setuid(uid);
  }
}
module.exports = function(options, pages) {

  var watchers = [];
  for (var i = 0; i < pages.length; i++) {
    (function(page) {
      watchers[i] = gulp.watch(['src/page/' + page + '/**'], function() {

        unRoot();
        gulpMap['html'](options, page);
        gulpMap['less'](options, page);
        gulpMap['webpack'](options, page);
        gulpMap['assets'](page);

      });
      watchers[i].on('change', function(event) {

        gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
      });
    }(pages[i]));
  }

  watchers[watchers.length] = gulp.watch(['src/lib/**'], function() {

    unRoot();
    gulpMap['lib']();
  });
  watchers[watchers.length - 1].on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });

  watchers[watchers.length] = gulp.watch(['src/component/**', 'src/service/**', 'src/util/**', 'src/widget/**'], function() {

    for (var i = 0; i < pages.length; i++) {
      unRoot();
      gulpMap['html'](options, pages[i]);
      gulpMap['less'](options, pages[i]);
      gulpMap['webpack'](options, pages[i]);
    }
  });
  watchers[watchers.length - 1].on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });

};
