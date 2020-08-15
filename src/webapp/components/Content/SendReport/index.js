import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import SearchInput from "commonComponents/SearchInput";
import * as actions from "store/actions";
import { Input, Radio, DatePicker, Space } from "antd";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import "./index.less";
const radioOptions = [
  { label: "通过", value: "yes" },
  { label: "不通过", value: "no" },
];

@withRouter
@autobind
class SendReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testResult: "yes", // 测试结果
      testContent: "", // 测试内容
      testProblem: "", // 测试遇到的问题
      taskName: "", // 项目名称
    };
  }

  componentDidMount() {
    this.props.checkLeftNavFn && this.props.checkLeftNavFn();
  }

  handleRadioChange = (e) => {
    this.setState({
      testResult: e.target.value,
    });
  };

  handleTestContentChange = (v) => {
    this.setState({
      testContent: v.target.value,
    });
  };

  handleTestProblemChange = (v) => {
    console.log(v);
  };

  renderBreadcrumb = () => <RightConBreadcrumb text="发送测试报告" />;

  renderForm = () => (
    <>
      <RightConSubTitle text="填写测试报告" />
      <div className="inputArea">
        <div className="sendReportItem">
          <span className="inputText">项目名称 * </span>
          {/* <Select
          defaultValue="main_feed"
          onChange={this.handleServicesChange}
          className="sendReportItemSelect"
          value={service}
        >
          {this.renderServicesOptions()}
        </Select> */}
          <SearchInput
            csName="sendReportItemSelect"
            placeholder="请填写项目名称"
          />
          <span className="inputText">测试平台</span>
          <Input
            placeholder="请填写测试平台"
            // value={mid}
            // onChange={this.handleMidChange}
            className="sendReportItemSelect"
          />
          <span className="inputText">测试环境</span>
          <Input
            placeholder="请填写测试环境"
            // value={mid}
            // onChange={this.handleMidChange}
            className="sendReportItemSelect"
          />
        </div>

        <div className="sendReportItem">
          <span className="inputText">测试版本</span>
          <Input
            placeholder="请填写测试版本"
            // value={mid}
            // onChange={this.handleMidChange}
            className="sendReportItemSelect"
          />
          <span className="inputText">测试备注</span>
          <Input
            placeholder="请填写测试版本"
            // value={mid}
            // onChange={this.handleMidChange}
            className="sendReportItemSelect"
          />
          <span className="inputText">测试时间</span>
          <Space direction="vertical" size={12}>
            <RangePicker />
            {/* <RangePicker showTime />
          <RangePicker picker="week" />
          <RangePicker picker="month" />
          <RangePicker picker="year" /> */}
          </Space>
        </div>

        <div className="sendReportItem">
          <span className="inputText">测试人员</span>
          <Input
            placeholder="请填写联调人员"
            // value={mid}
            // onChange={this.handleMidChange}
            className="sendReportItemSelect"
          />
          <span className="inputText">收件人</span>
          <Input
            placeholder="逗号分割"
            // value={mid}
            // onChange={this.handleMidChange}
            className="sendReportItemSelect"
          />
          <span className="inputText">抄送</span>
          <Input
            placeholder="逗号分割"
            // value={mid}
            // onChange={this.handleMidChange}
            className="sendReportItemSelect"
          />
        </div>

        <div className="sendReportItem">
          <span className="inputText">测试结果</span>
          <Radio.Group
            options={radioOptions}
            onChange={this.handleRadioChange}
            value={this.state.test}
          />
        </div>

        <div className="sendReportItem">
          <span className="inputText">测试内容</span>
          <TextArea
            style={{
              width: "50%",
              borderBottomLeftRadius: "5px",
              height: "100px",
            }}
            allowClear
            onChange={this.handleTestContentChange}
            value={this.state.testContent}
            className="textAreaDiv"
          ></TextArea>
        </div>

        <div className="sendReportItem">
          <span className="inputText">测试问题</span>
          <TextArea
            style={{
              width: "50%",
              borderBottomLeftRadius: "5px",
              height: "100px",
            }}
            allowClear
            onChange={this.handleTestProblemChange}
            value={this.state.testProblem}
            className="textAreaDiv"
          ></TextArea>
        </div>
      </div>
    </>
  );

  render() {
    return (
      <div className="rightCon sendReport">
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
let mapDispatchToProps = (dispatch) => {
  return {
    setEnvLists: (envLists) => {
      dispatch(actions.setEnvLists(envLists));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendReport);
