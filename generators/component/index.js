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
          name: 'componentName',
          message: 'Name of component?',
          default: 'yourComponent',
          warning: ''
        }
      ];

      this.prompt(prompts, function (props) {
        this.componentName = props.componentName;
        cb();

      }.bind(this));
    },

    app: function () {
      var componentSrc = 'src/component/'+this.componentName;

      this.mkdir(componentSrc);

      this.template(
        this.templatePath(templates+'component/index.js'),
        this.destinationPath(componentSrc+'/index.js')
      );
      this.template(
        this.templatePath(templates+'component/index.less'),
        this.destinationPath(componentSrc+'/index.less')
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
