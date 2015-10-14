'use strict';
var path = require('path');

var templates = require('./main').templates;

module.exports = {
  ask: function() {
    var cb = this.async();

    cb();
  },

  create: function() {
    this.fs.copy(
      this.templatePath(templates+'component'),
      this.destinationPath('src/component')
    );
  }
};
