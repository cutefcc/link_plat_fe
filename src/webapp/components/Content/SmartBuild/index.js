import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import "./index.less";

@withRouter
@autobind
class SmartBuild extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="智能搭建环境" />;

  render() {
    return <div className="rightCon smartBuild">{this.renderBreadcrumb()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(SmartBuild);
