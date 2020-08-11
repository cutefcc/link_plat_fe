import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import "./index.less";

@withRouter
@autobind
class MockSfst extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="查询MockSfst返回数据" />;

  render() {
    return <div className="rightCon mockSfst">{this.renderBreadcrumb()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(MockSfst);
