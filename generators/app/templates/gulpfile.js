var wrench = require('wrench');
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var fs = require('fs');

var pkg = require('./package');

var options = {
  name: pkg.name,
  version: pkg.version,
  main_js: 'index.js',
  main_less: 'index.less',
  main_css: 'index.css',
  main_html: 'index.html'
};

var gulpMap = {};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  gulpMap[file.split('.')[0]] = require('./gulp/' + file);
});

// 获取src/page下的目录，并把这些目录下的index.js作为webpack的entries
var pages = fs.readdirSync(path.join(__dirname, 'src/page'));
if (pages.indexOf('.DS_Store') !== -1) {
  pages.splice(pages.indexOf('.DS_Store'), 1);
}
if (pages.indexOf('service-worker') !== -1) {
  pages.splice(pages.indexOf('service-worker'), 1);
}
if (pages.indexOf('service-worker.js') !== -1) {
  pages.splice(pages.indexOf('service-worker.js'), 1);
}

gulp.task('default', function() {
  del(['build'], function() {
    for (var i = 0; i < pages.length; i++) {
      gulpMap['html'](options, pages[i]);
      gulpMap['less'](options, pages[i]);
      gulpMap['webpack'](options, pages[i]);
      gulpMap['assets'](pages[i]);
    }
    gulpMap['lib']();
  });
});

// 启动server
gulp.task('server', function() {
  gulpMap['server'](options);
  gulpMap['watch'](options, pages);
});

// 启动test
gulpMap['test']();

// 编译serviceWorker
gulp.task('sw', function() {
  gulpMap['serviceWorker'](options);
});
