// 推荐使用ES2015的语法

const Page = {
  init() {
    // 页面初始化逻辑
    // 通过index.html中的：window.Page.init();进行调用
    console.log('init!');
  },
  render() {

  },
  bind() {

  }
};

window.Page = Page;
