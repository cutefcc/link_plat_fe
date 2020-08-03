import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import { Select, Input, Button } from "antd";
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
      json: {
        // name: "An ice sculpture",
        // price: 12.5,
        // tags: ["cold", "ice"],
        // dimensions: {
        //   length: 7.0,
        //   width: 12.0,
        //   height: 9.5,
        // },
        // warehouseLocation: {
        //   latitude: -78.75,
        //   longitude: 20.4,
        // },
      },
    };
  }

  handleChange() {}

  handleJsonChange(e) {
    console.log(e.target.value);
    try {
      let json = JSON.parse(e.target.value);
      if (json) {
        this.setState({
          json: JSON.parse(e.target.value),
        });
      }
    } catch (err) {
      console.log(err);
    }
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
            value={JSON.stringify(this.state.json)}
            className="textAreaDiv"
          ></TextArea>
          <div
            className="jsonShow"
            dangerouslySetInnerHTML={{
              __html: prettyHtml(this.state.json, this.state.json.dimensions),
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
