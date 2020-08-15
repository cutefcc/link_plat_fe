import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import "./index.less";

@withRouter
@autobind
class CountPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.checkLeftNavFn && this.props.checkLeftNavFn();
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="统计🧮页面展示" />;

  render() {
    return <div className="rightCon countPage">{this.renderBreadcrumb()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(CountPage);
