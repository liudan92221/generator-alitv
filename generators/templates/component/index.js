require('./index.less');
class <%= componentName %> extends React.Component {
  constructor() {
  super();
}

  render() {
  return (
    <div class="alitvcpnt-<%= componentName %>"></div>
  );
}

}
<%= componentName %>.displayName = '<%= componentName %>';
<%= componentName %>.propTypes = {

};
<%= componentName %>.defaultProps = {

};

export default <%= componentName %>;
