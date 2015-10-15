'use strict';
var templates = require('./main').templates;

module.exports = {
  ask: function() {
    var cb = this.async();

    cb();
  },

  make: function() {
    this.template(
      this.templatePath(templates+'component'),
      this.destinationPath('src/component')
    );
  },

  create: function() {
    this.mkdir('src/component');
    //this.fs.copy(
    //  this.templatePath(templates+'component'),
    //  this.destinationPath('src/component')
    //);
  }
};
