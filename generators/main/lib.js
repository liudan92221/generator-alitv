'use strict';
var path = require('path');

var templates = require('./main').templates;

module.exports = {
  ask: function() {
    var cb = this.async();

    var prompts = [
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules would you like to include?',
        choices: [
          {
            value: 'react',
            name: 'react.js',
            checked: true
          },
          {
            value: 'es5sham',
            name: 'es5sham-min.js',
            checked: true
          },
          {
            value: 'es5shim',
            name: 'es5shim-min.js',
            checked: true
          },
          {
            value: 'console',
            name: 'console-polyfill.js',
            checked: true
          }
        ]
      }
    ];

    this.prompt(prompts, function (props) {
      var hasMod = function (mod) {
        return props.modules.indexOf(mod) !== -1;
      };
      this.react = hasMod('react');
      this.es5sham = hasMod('es5sham');
      this.es5shim = hasMod('es5shim');
      this.console = hasMod('console');

      cb();
    }.bind(this));
  },

  create: function() {
    this.mkdir('src/lib');
    this.mkdir('src/lib/css');
    this.mkdir('src/lib/js');
    this.fs.copy(
      this.templatePath(templates+'lib/css/reset.css'),
      this.destinationPath('src/lib/css/reset.css')
    );
    this.fs.copy(
      this.templatePath(templates+'lib/css/reset.less'),
      this.destinationPath('src/lib/css/reset.less')
    );
    this.fs.copy(
      this.templatePath(templates+'lib/base.css'),
      this.destinationPath('src/lib/base.css')
    );
    this.fs.copy(
      this.templatePath(templates+'lib/base.less'),
      this.destinationPath('src/lib/base.less')
    );
    this.fs.copy(
      this.templatePath(templates+'lib/js/get-min.js'),
      this.destinationPath('src/lib/js/get-min.js')
    );

    if (this.react) {
      this.fs.copy(
        this.templatePath(templates+'lib/js/react.js'),
        this.destinationPath('src/lib/js/react.js')
      );
    }

    if (this.es5sham) {
      this.fs.copy(
        this.templatePath(templates+'lib/js/es5sham-min.js'),
        this.destinationPath('src/lib/js/es5sham-min.js')
      );
    }

    if (this.es5shim) {
      this.fs.copy(
        this.templatePath(templates+'lib/js/es5shim-min.js'),
        this.destinationPath('src/lib/js/es5shim-min.js')
      );
    }

    if (this.console) {
      this.fs.copy(
        this.templatePath(templates+'lib/js/console-polyfill.js'),
        this.destinationPath('src/lib/js/console-polyfill.js')
      );
    }
  }
};
