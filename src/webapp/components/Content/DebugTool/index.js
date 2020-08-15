import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import "./index.less";

@withRouter
@autobind
class DebugTool extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.checkLeftNavFn && this.props.checkLeftNavFn();
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="工具🔧详情页面" />;

  render() {
    return <div className="rightCon debugTool">{this.renderBreadcrumb()}</div>;
  }
}

let mapStateToProps = (state) => {
  return {
    ...state,
  };
};
let mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DebugTool);
