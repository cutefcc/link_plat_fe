import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from "ramda";
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import { Input, Button, Checkbox } from "antd";
import "./index.less";

const options = [
  { label: "UVE", value: "UVE" },
  { label: "IDX", value: "IDX" },
  { label: "RENDER", value: "RENDER" },
  { label: "WAX", value: "WAX" },
  { label: "TOPFANS", value: "TOPFANS" },
  { label: "FANSEXTEND", value: "FANSEXTEND" },
];

@withRouter
@autobind
class NewEnv extends React.Component {
  constructor(props) {
    super(props);
  }

  handleIpChange = () => {};

  handleUvePortChange = () => {};

  handleProjectNameChange = () => {};

  handleProjectInfoChange = () => {};

  handleCheckboxChange = (arr) => {
    console.log("arr", arr);
  };

  renderBreadcrumb = () => <RightConBreadcrumb text="新建联调环境" />;

  renderForm = () => {
    return (
      <>
        <RightConSubTitle text="表单" />
        <div className="inputArea">
          <div className="newEnvItem">
            <span className="inputText">机器IP</span>
            <Input
              placeholder="请填写机器IP"
              className="newEnvItemSelect"
              onChange={this.handleIpChange}
            />
            <span className="inputText">UVE端口号</span>
            <Input
              placeholder="请填写UVE端口号"
              className="newEnvItemSelect"
              onChange={this.handleUvePortChange}
            />
            <span className="inputText">联调项目名称</span>
            <Input
              placeholder="请填写联调项目名称"
              className="newEnvItemSelect"
              onChange={this.handleProjectNameChange}
            />
          </div>
          <div className="newEnvItem">
            <span className="inputText">联调项目描述</span>
            <Input
              placeholder="请填写联调项目描述"
              className="newEnvItemSelect"
              onChange={this.handleProjectInfoChange}
            />
            <span className="inputText">联调模块</span>
            <Checkbox.Group
              options={options}
              onChange={this.handleCheckboxChange}
            />
          </div>

          <div className="newEnvItem">
            <Button
              type="primary"
              size="middle"
              style={{ borderRadius: "5px", marginLeft: "20px" }}
              onClick={() => {}}
            >
              保存
            </Button>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="rightCon newEnv">
        {this.renderBreadcrumb()}
        {this.renderForm()}
      </div>
    );
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
