require('./index.less');

class MessageBox extends React.Component {
  constructor() {
    super();
  }

  clickOk() {
    if (this.props.content.beforeOk) {
      this.props.content.beforeOk(this.props.closeHandler);
    } else {
      this.props.closeHandler();
    }
  }

  render() {
    let content;
    if (this.props.content.type === 'text') {
      content = (
        <div className="alitvcpnt-messagebox-content">
          <div className="alitvcpnt-messagebox-content-text">{this.props.content.text}</div>
        </div>
      );
    } else if (this.props.content.type === 'keys'){
      content = (
        <div className="alitvcpnt-messagebox-content">
          <div className="alitvcpnt-messagebox-content-appkey-label">App Key</div>
          <div className="alitvcpnt-messagebox-content-appkey-value">{this.props.content.appKey}</div>
          <div className="alitvcpnt-messagebox-content-secretkey-label">Secret Key</div>
          <div className="alitvcpnt-messagebox-content-secretkey-value">{this.props.content.secretKey}</div>
        </div>
      );
    }
    return (
      <div style={{display: this.props.show ? 'block' : 'none'}} className="alitvcpnt-messagebox">
        <div onClick={this.props.closeHandler} className="alitvcpnt-messagebox-closeicon"></div>
        {content}
        <div onClick={() => this.clickOk()} className="alitvcpnt-messagebox-okbutton">确定</div>
      </div>
    );
  }

}
MessageBox.displayName = 'MessageBox';

MessageBox.propTypes = {
  // 是否显示MessageBox
  show: React.PropTypes.bool,
  // message的内容，格式如下
  // {
  //   type: 'text/keys',目前有text和keys两种类型，text是简单提示文本，keys是显示appkey信息
  //   text: 'text',若type是text，显示text的内容
  //   appKey: '123',若type是keys，显示appKey
  //   secretKey: '234',若type是keys，显示secretKey
  //   beforeOk: null 若存在，则在点击确认前需要执行该函数，要接受一个回调函数用于操作完成后执行关闭MessageBox
  // }
  content: React.PropTypes.object,
  // 关闭MessageBox的函数，因为一般MessageBox的显示与否是通过外面的组件控制的，所以是外面的一个改变show为false的函数
  closeHandler: React.PropTypes.func
};
MessageBox.defaultProps = {
  show: false,
  content: {},
  closeHandler: e => console.warn('MessageBox close icon 未添加处理')
};

export default MessageBox;
