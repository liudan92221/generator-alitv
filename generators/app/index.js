'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var lib = require('../main/lib');
var component = require('../main/component');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the polished ' + chalk.red('alitv') + ' generator!'
    ));

    //var prompts = [{
    //  type: 'confirm',
    //  name: 'someOption',
    //  message: 'Would you like to enable this option?',
    //  default: true
    //}];
    //
    //this.prompt(prompts, function (props) {
    //  this.props = props;
    //  // To access props later use this.props.someOption;
    //
    //  done();
    //}.bind(this));
    done();
  },

  writing: {
    init: function() {

    },

    askFor: function () {
      var cb = this.async();
      var fileName = path.basename(process.cwd());

      var prompts = [
        {
          name: 'projectName',
          message: 'Name of Project?',
          default: fileName,
          warning: ''
        },
        {
          name: 'author',
          message: 'Author Name:',
          default: '',
          warning: ''
        },
        {
          name: 'email',
          message: 'Author Email:',
          default: '',
          warning: ''
        },
        {
          name: 'groupName',
          message: 'Group Name:',
          default: 'de',
          warning: ''
        },
        {
          name: 'version',
          message: 'Version:',
          default: '1.0.0',
          warning: ''
        }
      ];

      // your-mojo-name => YourMojoName
      function parseMojoName(name){
        return name.replace(/\b(\w)|(-\w)/g,function(m){
          return m.toUpperCase().replace('-','');
        });
      }

      this.prompt(prompts, function (props) {
        this.packageName = props.projectName;// project-name
        this.projectName = parseMojoName(this.packageName); //ProjectName
        this.author = props.author;
        this.email = props.email;
        this.version = props.version;
        this.groupName = props.groupName;
        cb();

      }.bind(this));
    },

    askForLib: function() {
      lib.ask.bind(this)();
    }
    ,

    app: function () {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('gulp'),
        this.destinationPath('gulp')
      );
      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.template(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );

      this.mkdir('src');
      this.writing._lib.bind(this)();
      //this.writing._component.bind(this)();
      this.mkdir('src/component');
      this.mkdir('src/page');
      this.mkdir('src/util');
      this.mkdir('src/service');
      this.mkdir('doc');
      this.mkdir('build');
    },

    _lib: function() {
      lib.create.bind(this)();
    },

    _component: function() {
      component.make.bind(this)();
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
