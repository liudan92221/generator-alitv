"use strict";

var gutil = require('gulp-util');
var Xtpl = require('xtpl');
var path = require('path');
var fs = require('fs');

module.exports = function(options, page) {
  var xtpl = path.join(__dirname, '../src/page/'+page+'/index.xtpl');
  var data = path.join(__dirname, '../src/page/'+page+'/data.json');
  var exists1 = fs.existsSync(xtpl);
  var exists2 = fs.existsSync(data);
  if (exists1 && exists2) {
    Xtpl.renderFile(xtpl, require(data),function(err, content){
      if (err) {
        gutil.log(gutil.colors.red('XTemplate: src/page/' + page + '/index.xtpl'));
      } else {
        fs.writeFile(path.join(__dirname, '../build/page/'+page+'/index.html'), content, function(err) {
          if (err) {
            gutil.log(gutil.colors.red('XTemplate: src/page/' + page + '/index.xtpl'));
          } else {
            gutil.log(gutil.colors.green('XTemplate: build/page/' + page + '/index.html'));
          }
        })
      }
    });
  }
};
