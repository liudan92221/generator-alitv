'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

var templates = require('../main/main').templates;

module.exports = yeoman.generators.Base.extend({
  prompting: function () {

  },

  writing: {
    init: function() {

    },

    askFor: function () {
      var cb = this.async();
      cb();
    },

    app: function () {
      var pageSrc = 'src/page/';

      this.fs.copy(
        this.templatePath(templates+'sw/'),
        this.destinationPath(pageSrc)
      );
    },

    end: function () {

    },

    projectfiles: function () {

    }
  },

  install: function () {

  }
});
