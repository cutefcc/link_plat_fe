import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as R from "ramda";
import fetch from "cross-fetch";
import autobind from "autobind-decorator";
import { Select, Input, Button, message } from "antd";
const { Option } = Select;
import { services, styles } from "constants/mockUve";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import SearchInput from "commonComponents/SearchInput";
import JsonShow from "commonComponents/JsonShow";
import { getUrlParams } from "utils/index";
import "./index.less";

@withRouter
@autobind
class MockUve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonStr: "", // TextArea 内容
      json: "",
      service: "main_feed",
      style: "see_download",
      mid: "",
      promotion_objective: "",
      optimization_objective: "",
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

  handleChange() {}

  handleServicesChange(val) {
    this.setState({
      service: val,
    });
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

  handleMidChange(e) {
    this.setState({
      mid: e.target.value,
    });
  }

  handlePromotionObjChange(e) {
    this.setState({
      promotion_objective: e.target.value,
    });
  }

  handleOptimizationObjChange(e) {
    this.setState({
      optimization_objective: e.target.value,
    });
  }

  handleAutoGenerate() {
    const data = {
      service: R.pathOr("", ["state", "service"], this),
      style: R.pathOr("", ["state", "style"], this),
      mid: R.pathOr("", ["state", "mid"], this),
      promotion_objective: R.pathOr("", ["state", "promotion_objective"], this),
      optimization_objective: R.pathOr(
        "",
        ["state", "optimization_objective"],
        this
      ),
    };
    fetch("/api/autoGenerate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.message) {
          this.handleShowMessage("error", resp.message);
        }
      });
  }

  renderServicesOptions() {
    return services.map((item) => {
      return <Option key={item.value}>{item.text}</Option>;
    });
  }

  renderStylesOptions() {
    return styles.map((item) => {
      return <Option key={item.value}>{item.text}</Option>;
    });
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="mockUVE返回数据" />;

  renderAutoMock() {
    const { service, style, mid } = this.state;
    const task_name = R.pathOr("", ["state", "urlParams", "task_name"], this);
    return (
      <>
        <RightConSubTitle text="自动生成mock数据" />
        <div className="inputArea">
          <div className="mockUveItem">
            <span className="inputText">项目名称</span>
            <SearchInput
              csName="mockUveItemSelect"
              placeholder="请填写项目名称"
              defaultVal={task_name}
            />
            <span className="inputText">选择场景</span>
            <Select
              defaultValue="main_feed"
              onChange={this.handleServicesChange}
              className="mockUveItemSelect"
              value={service}
            >
              {this.renderServicesOptions()}
            </Select>
            <span className="inputText">选择样式</span>
            <Select
              defaultValue="see_download"
              onChange={this.handleChange}
              className="mockUveItemSelect"
              value={style}
            >
              {this.renderStylesOptions()}
            </Select>
          </div>
          <div className="mockUveItem">
            <span className="inputText">指定mid</span>
            <Input
              placeholder=""
              value={mid}
              onChange={this.handleMidChange}
              className="mockUveItemSelect"
            />
            <span className="inputText">营销目标</span>
            <Input
              placeholder="指定promotion_objective"
              className="mockUveItemSelect"
              onChange={this.handlePromotionObjChange}
            />
            <span className="inputText">优化目标</span>
            <Input
              placeholder="指定optimization_objective"
              className="mockUveItemSelect"
              onChange={this.handleOptimizationObjChange}
            />
          </div>
          <div className="btnArea">
            <Button
              type="primary"
              style={{ marginRight: "213px", borderRadius: "5px" }}
              onClick={this.handleAutoGenerate}
            >
              生成
            </Button>
            <Button type="primary" style={{ borderRadius: "5px" }}>
              预览
            </Button>
          </div>
        </div>
      </>
    );
  }

  renderManualMock() {
    const { jsonStr, json } = this.state;
    return (
      <JsonShow
        jsonStr={jsonStr}
        json={json}
        onJsonChange={this.handleJsonChange}
        title="手动生成mock数据"
      />
    );
  }

  render() {
    return (
      <div className="rightCon mockUve">
        {this.renderBreadcrumb()}
        {this.renderAutoMock()}
        {this.renderManualMock()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MockUve);
