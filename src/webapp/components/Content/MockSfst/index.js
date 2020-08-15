import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as R from "ramda";
import { message } from "antd";
import autobind from "autobind-decorator";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import SearchInput from "commonComponents/SearchInput";
import JsonShow from "commonComponents/JsonShow";
import { getUrlParams } from "utils/index";
import "./index.less";

@withRouter
@autobind
class MockSfst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonStr: "", // TextArea 内容
      json: "",
      urlParams: {},
    };
  }

  componentDidMount() {
    this.handleGetUrlParams();
  }

  handleGetUrlParams = () => {
    this.setState({
      urlParams: getUrlParams(),
    });
  };

  handleShowMessage(type, info) {
    message.destroy();
    message[type](info);
  }

  handleJsonChange(e) {
    const textAreaText = e.target.value;
    if (textAreaText === "") {
      this.setState({
        jsonStr: "",
        json: "",
      });
      return;
    }
    this.setState({
      jsonStr: textAreaText,
    });
    // try parse json str to json
    let json = null;
    try {
      json = JSON.parse(textAreaText);
      this.handleShowMessage("success", "JSON字符串 数据合法");
    } catch {
      json = {};
      this.handleShowMessage("error", "JSON字符串 格式不合法");
    }
    this.setState({
      json,
    });
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="查询MockSfst返回数据" />;

  renderInputArea() {
    const task_name = R.pathOr("", ["state", "urlParams", "task_name"], this);
    return (
      <>
        <RightConSubTitle text="表单区域" />
        <div className="inputArea">
          <div className="inputAreaItem">
            <span className="inputText">项目名称</span>
            <SearchInput
              csName="mockSfstItemSelect"
              placeholder="请填写项目名称"
              defaultVal={task_name}
            />
          </div>
        </div>
      </>
    );
  }

  renderJsonShow = () => {
    const { jsonStr, json } = this.state;
    return (
      <JsonShow
        jsonStr={jsonStr}
        json={json}
        onJsonChange={this.handleJsonChange}
        title="输入引擎广告json"
      />
    );
  };

  render() {
    return (
      <div className="rightCon mockSfst">
        {this.renderBreadcrumb()}
        {this.renderInputArea()}
        {this.renderJsonShow()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MockSfst);
