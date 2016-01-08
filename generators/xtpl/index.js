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

      var prompts = [
        {
          name: 'moduleName',
          message: 'Name of Module?',
          default: 'your_module',
          warning: ''
        }
      ];

      this.prompt(prompts, function (props) {
        this.moduleName = props.moduleName;
        cb();

      }.bind(this));
    },

    app: function () {
      var pageSrc = 'src/page/'+this.moduleName;

      this.mkdir(pageSrc);

      this.template(
        this.templatePath(templates+'xtpl/index.xtpl'),
        this.destinationPath(pageSrc+'/index.xtpl')
      );
      this.fs.copy(
        this.templatePath(templates+'xtpl/index.js'),
        this.destinationPath(pageSrc+'/index.js')
      );
      this.fs.copy(
        this.templatePath(templates+'xtpl/data.json'),
        this.destinationPath(pageSrc+'/data.json')
      );
      this.template(
        this.templatePath(templates+'xtpl/index.less'),
        this.destinationPath(pageSrc+'/index.less')
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
