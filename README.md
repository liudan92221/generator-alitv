# generator-alitv [![Build Status](https://secure.travis-ci.org/liudan92221/generator-alitv.png?branch=master)](https://travis-ci.org/liudan92221/generator-alitv)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-alitv from npm, run:

```bash
npm install -g generator-alitv
```

Finally, initiate the generator:

```bash
yo alitv           // 初始化一个标准的项目，生成其目录结构
yo alitv:lib       // 初始化一个lib文件中js库
yo alitv:component // 初始化一个react component文件
yo alitv:page      // 初始化一个页面
yo alitv:test      // 初始化一个测试文件
yo alitv:sw        // 创建service worker文件
```

```bash
gulp              // 进行项目构建
gulp server       // 开启开发模式的前端服务器，并watch项目文件变化自动构建
gulp test         // 启动测试文件中测试代码
gulp sw           // 构建service worker文件
```

```bash
└── project root
        ├── gulp.js          // gulp的脚本入口文件
        ├── gulp             // 存放gulp构建相关模块，可根据需要自行修改
        ├── package.json     // 存放项目基本信息和node的依赖关系配置
        ├── README.md        // 项目说明文档
        ├── doc              // 存放生成项目API文档
        ├── test             // 存放测试文件，可执行`yo alitv:test`生成一个test
        ├── node_modules     // 存放项目的node模块
        └── src              // 项目源文件目录
            ├── component    // 存放react组件文件，可执行`yo alitv:component`生成一个component
            ├── lib          // 存放基础js和css文件和第三方库
            ├── page         // 存放demo页面和入口文件，可执行`yo alitv:page`生成一个page
            ├── service      // 存放封装好的ajax调用接口
            └── util         // 存放应用级别的可重用组件
        └── build            // 项目构建目录，目录结构与src保持一致
```

### 特性
* webpack中利用babel解析es2015为es5和component文件中react组建，代码位置：gulp/webpack.js
* gulp server开启之后，watch监听开启，单个页面的改变之后针对单个页面的构建，代码位置：gulp/watch.js
* 构建完成之后，build文件中每个页面文件的css和js文件都会生成一个map文件，支持source-map的浏览器可以轻松的定位到源文件
* test文件夹中可以编写自己的测试用例，运行测试用例可以用个终端命令gulp test运行，也可以通过测试文件夹中的html文件在浏览器中运行，代码位置：gulp/test.js
* 增加service worker功能，可以离线缓存资源

## License

MIT
