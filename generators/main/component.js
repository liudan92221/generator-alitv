'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var templates = require('./main').templates;

module.exports = {
  ask: function() {
    var cb = this.async();

    cb();
  },

  create: function() {
    this.mkdir('src/component');
    this.mkdir('src/component/messageBox');
    this.fs.copy(
      this.templatePath(templates+'component/messageBox/index.js'),
      this.destinationPath('src/component/messageBox/index.js')
    );
    this.fs.copy(
      this.templatePath(templates+'component/messageBox/index.less'),
      this.destinationPath('src/component/messageBox/index.less')
    );
  }
};
