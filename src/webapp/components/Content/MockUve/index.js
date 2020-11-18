import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as R from "ramda";
import fetch from "cross-fetch";
import autobind from "autobind-decorator";
import { Select, Input, Button, message, InputNumber } from "antd";
const { Option } = Select;
import { services, styles } from "constants/mockUve";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
// import SearchInput from "commonComponents/SearchInput";
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
      json: {
        error_msg: "success",
        return_code: 200,
        id: "16049888380549988580",
        respid: "16049888380549988580",
        ext: {
          timestamp_us: {
            start: "1604988838163198",
            end: "1604988838345651",
          },
          uve_timestamp: "1604988838162566",
        },
        faraday: {
          big_banner_enable_profit_share_title: {
            value: "true",
          },
          enable_lp_singelpage: {
            value: "false",
          },
          enable_app_icon: {
            value: "true",
            description: "layer-2149#exp-9964",
          },
          is_big_card: {
            value: "0",
          },
        },
        data: [
          {
            adengine_version: "3.0",
            return_code: 200,
            result: [
              {
                mediainfo: [
                  {
                    is_filter_duplicated: 1,
                    autoplay: 0,
                  },
                ],
                cust_id: "6132666105",
                structs: [
                  {
                    name: "",
                    scheme: "",
                  },
                ],
                object_id: "4570142530604425",
                is_follow: false,
                ad_tag: "2",
                monitor_log: {
                  adid: "10096150",
                },
                recommend: "广告",
                dynamic_creative: [],
                tag: "其他",
                monitor_url: [
                  {
                    wb_real_expo:
                      "https://vs.biz.weibo.com/wb_real_expo?p=783&s=01&m=45%5F1604988838054998858045000010096150&k=559bf2b61ceaf999c9d1bb1a4e516d2b&t=783%5F006",
                  },
                ],
                render_type: 71,
                optimization_objective: 86004001,
                adtype: "1",
                uid: "1843425801",
                promotion_objective: 88030004,
                is_dynamic_creative: false,
                mark:
                  "3_reallog_mark_ad:8|3_1576240979004515179605000006917291",
              },
            ],
            service: "mainfeed",
            business_type: "017830",
            impression_id: "1604988838054998858045",
            channel: "agent",
            ext: {
              freq_info: [
                "1843425801_10096150_4559992101281391_70101011_6132666105_14_88030004_783_2730827_101_NULL_0_0_1_4559992101281391",
              ],
              bid_type: 1,
              ad_settle_channel: "1",
            },
            titles: [],
            position: 3,
            render_flag: 1,
            cand_type: "783_006",
            ecpm: 200,
          },
        ],
      },
      service: "main_feed",
      style: "see_download",
      port: "",
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

  handleSubmit() {
    const { port, json } = this.state;
    if (!port) {
      this.handleShowMessage("error", "port 必填");
      return;
    }
    fetch("/api/uploadMock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uveport: port,
        mockdata: json,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        if (res.data === "succeed") {
          this.handleShowMessage("success", "提交成功");
        } else {
          this.handleShowMessage("error", "提交失败");
        }
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

  handlePortChange(num) {
    if (Object.prototype.toString.call(num) === "[object Number]") {
      this.setState({
        port: num,
      });
    }
  }

  handlePortBlur() {
    const { port } = this.state;
    if (!port) {
      this.handleShowMessage("error", "port 必填");
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

  renderBreadcrumb = () => <RightConBreadcrumb text="mockUVE返回数据" />;

  renderAutoMock() {
    const { service, style, mid, port } = this.state;
    // const task_name = R.pathOr("", ["state", "urlParams", "task_name"], this);
    return (
      <>
        <RightConSubTitle text="自动生成mock数据" />

        <div className="inputArea">
          <div className="mockUveItem">
            <span className="inputText">环境端口</span>
            <InputNumber
              autoFocus={true}
              placeholder=""
              min={3000}
              max={9999}
              value={port}
              onChange={this.handlePortChange}
              onBlur={this.handlePortBlur}
              className="mockUveItemSelect"
            />
            <span className="inputText">项目名称</span>
            {/* <SearchInput
              className="mockUveItemSelect"
              placeholder="请填写项目名称"
              defaultVal={task_name}
            /> */}
            <Input
              placeholder=""
              // value={mid}
              // onChange={this.handleMidChange}
              className="mockUveItemSelect"
            />
          </div>

          <div className="mockUveItem">
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
        onSubmit={this.handleSubmit}
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
