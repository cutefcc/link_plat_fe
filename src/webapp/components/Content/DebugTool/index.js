import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from "ramda";
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import { services } from "constants/mockUve";
import { Select, Input, Button } from "antd";
const { Option } = Select;
import "./index.less";

@withRouter
@autobind
class DebugTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: "main_feed",
    };
  }

  handleServicesChange(val) {
    this.setState({
      service: val,
    });
  }

  handleGoTest = () => {
    console.log("go test");
  };

  renderServicesOptions() {
    return services.map((item) => {
      return <Option key={item.value}>{item.text}</Option>;
    });
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="环境详情页面" />;

  renderResult = () => {
    return (
      <>
        <RightConSubTitle text="诊断结果" />
        <div className="inputArea">
          <div className="resultText">uve norequest</div>
        </div>
      </>
    );
  };

  renderTestInput = () => {
    const { service } = this.state;
    return (
      <>
        <RightConSubTitle text="选择参数进行诊断" />
        <div className="inputArea">
          <div className="inputAreaItem">
            <span className="inputText">选择uve场景</span>
            <Select
              defaultValue="main_feed"
              onChange={this.handleServicesChange}
              className="debugToolItemSelect"
              value={service}
            >
              {this.renderServicesOptions()}
            </Select>
            <span className="inputText">输入uid</span>
            <Input placeholder="输入uid" className="debugToolItemSelect" />
            <Button
              type="primary"
              style={{ borderRadius: "5px" }}
              onClick={this.handleGoTest}
            >
              指定场景或uid诊断
            </Button>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="rightCon debugTool">
        {this.renderBreadcrumb()}
        {this.renderResult()}
        {this.renderTestInput()}
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

export default connect(mapStateToProps, mapDispatchToProps)(DebugTool);
