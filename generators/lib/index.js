'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var lib = require('../main/lib');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {

  },

  writing: {
    init: function() {

    },

    askFor: function () {
      lib.ask.bind(this)();
    },

    app: function () {
      lib.create.bind(this)();
    },

    end: function () {

    },

    projectfiles: function () {

    }
  },

  install: function () {

  }
});
