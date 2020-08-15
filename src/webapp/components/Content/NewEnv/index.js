import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import "./index.less";

@withRouter
@autobind
class NewEnv extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.checkLeftNavFn && this.props.checkLeftNavFn();
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="新建联调环境" />;

  render() {
    return <div className="rightCon newEnv">{this.renderBreadcrumb()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(NewEnv);
