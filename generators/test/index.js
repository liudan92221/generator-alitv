'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
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

      var prompts = [
        {
          name: 'testName',
          message: 'Name of Test?',
          default: 'yourTest',
          warning: ''
        }
      ];

      this.prompt(prompts, function (props) {
        this.testName = props.testName;
        cb();

      }.bind(this));
    },

    app: function () {
      var testSrc = 'test/'+this.testName;

      this.mkdir(testSrc);

      this.template(
        this.templatePath(templates+'test/index.html'),
        this.destinationPath(testSrc+'/index.html')
      );
      this.template(
        this.templatePath(templates+'test/index.js'),
        this.destinationPath(testSrc+'/index.js')
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
