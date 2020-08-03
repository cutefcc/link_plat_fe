import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import "./index.less";

@withRouter
@autobind
class NewEnv extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="newEnv">NewEnv</div>;
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
