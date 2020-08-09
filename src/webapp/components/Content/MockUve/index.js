import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import { Select, Input, Button, message } from "antd";
const { TextArea } = Input;
const { Option } = Select;
import { services, styles } from "../../../constants/mockUve";
import prettyHtml from "json-pretty-html";
import "./index.less";

@withRouter
@autobind
class MockUve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonStr: "", // TextArea 内容
      json: "",
    };
  }

  handleShowMessage(type, info) {
    message.destroy();
    message[type](info);
  }

  handleChange() {}

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

  render() {
    return (
      <div className="mockUve">
        <h2>mockUVE返回数据</h2>
        <h4 className="subTitle">自动生成mock数据</h4>
        <div className="inputArea">
          <div className="mockUveItem">
            <span className="inputText">选择场景</span>
            <Select
              defaultValue="main_feed"
              onChange={this.handleChange}
              className="mockUveItemSelect"
            >
              {this.renderServicesOptions()}
            </Select>
            <span className="inputText">选择样式</span>
            <Select
              defaultValue="see_download"
              onChange={this.handleChange}
              className="mockUveItemSelect"
            >
              {this.renderStylesOptions()}
            </Select>
            <span className="inputText">指定mid</span>
            <Input placeholder="" className="mockUveItemSelect" />
          </div>
          <div className="mockUveItem">
            <span className="inputText">营销目标</span>
            <Input
              placeholder="指定promotion_objective"
              className="mockUveItemSelect"
            />
            <span className="inputText">优化目标</span>
            <Input
              placeholder="指定optimization_objective"
              className="mockUveItemSelect"
            />
          </div>
          <div className="btnArea">
            <Button
              type="primary"
              style={{ marginRight: "213px", borderRadius: "5px" }}
            >
              生成
            </Button>
            <Button type="primary" style={{ borderRadius: "5px" }}>
              预览
            </Button>
          </div>
        </div>
        <h4 className="subTitle">手动生成mock数据</h4>

        <div className="jsonEdit">
          <TextArea
            style={{ width: "50%", borderBottomLeftRadius: "5px" }}
            allowClear
            onChange={this.handleJsonChange}
            value={this.state.jsonStr}
            className="textAreaDiv"
          ></TextArea>
          <div
            className="jsonShow"
            dangerouslySetInnerHTML={{
              __html: this.state.json === "" ? "" : prettyHtml(this.state.json),
            }}
          ></div>
        </div>
        <div className="bottomBtn">
          <Button
            type="primary"
            style={{ borderRadius: "5px", marginLeft: "20px" }}
          >
            提交
          </Button>
        </div>
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
