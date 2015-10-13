// 每次更新版本后都要在此更新版本号
var projectVersion = '1.0.0';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webserver = require('gulp-webserver');
var less = require('gulp-less');
var del = require('del');
var path = require('path');
var fs = require('fs');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

// 获取src/page下的目录，并把这些目录下的main.js作为webpack的entries
var pages = fs.readdirSync(path.join(__dirname, 'src/page'));
if (pages.indexOf('.DS_Store') !== -1) {
  pages.splice(pages.indexOf('.DS_Store'), 1);
}

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

function doWebpack(page) {
  var entry = {};
  entry[page] = './src/page/' + page + '/main.js';

  // webpack配置
  var cfg = {
    cache: true,
    entry: entry,
    output: {
      path: path.join(__dirname, 'build/page'),
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

  // 压缩webpack生成的js文件
  function minifyJs(page) {
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
  }

  webpack(cfg, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    minifyJs(page);
  });
}

// 编译less并压缩
function buildCss(page) {
  gulp.src('src/page/' + page + '/index.less')
    .pipe(less())
    .pipe(minifyCss({
      compatibility: '-units.ch,-units.in,-units.pc,-units.pt,-units.vh,-units.vm,-units.vmax,-units.vmin'
    }))
    .pipe(rename({
      suffix: '-min'
    }))
    .pipe(gulp.dest('build/page/' + page));
  gutil.log(gutil.colors.green('Build CSS: build/page/' + page + '/index-min.css'));
}

// 复制html文件和lib下的内容到build
function copyHtml(page) {
  gulp.src('src/page/' + page + '/index.html')
    .pipe(gulp.dest('build/page/' + page));
  gutil.log(gutil.colors.green('Copy HTML: build/page/' + page + '/index.html'));
}

function buildPage(page) {
  unRoot();
  copyHtml(page);
  buildCss(page);
  doWebpack(page);
}

function copyLibs() {
  unRoot();
  gulp.src('src/lib/**')
    .pipe(gulp.dest('build/lib/'));
  gutil.log(gutil.colors.green('Copy libs: build/lib'));
}

gulp.task('default', function() {
  del(['build'], function() {
    for (var i = 0; i < pages.length; i++) {
      buildPage(pages[i]);
    }
    copyLibs();
  });
});

// 启动server
gulp.task('server', function() {
  gulp.src('build/')
    .pipe(webserver({
      path: '/de/alitv-child/' + projectVersion + '/',
      host: '0.0.0.0',
      port: 80,
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'build/'
      },
      middleware: function(req, res, next) {
        gutil.log('Request received: ' + req.url);
        next();
      }
    }));
  gutil.log(gutil.colors.green('http://localhost/de/alitv-child/' + projectVersion + '/page'));

  var watchers = [];
  for (var i = 0; i < pages.length; i++) {
    (function(page) {
      watchers[i] = gulp.watch(['src/page/' + page + '/**'], function() {
        buildPage(page);
      });
      watchers[i].on('change', function(event) {
        gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
      });
    }(pages[i]));
  }
  watchers[watchers.length] = gulp.watch(['src/lib/**'], function() {
    copyLibs();
  });
  watchers[watchers.length - 1].on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });
  watchers[watchers.length] = gulp.watch(['src/component/**', 'src/service/**', 'src/util/**', 'src/widget/**'], function() {
    for (var i = 0; i < pages.length; i++) {
      buildPage(pages[i]);
    }
  });
  watchers[watchers.length - 1].on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });
});
