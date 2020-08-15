import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as R from "ramda";
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import SearchInput from "commonComponents/SearchInput";
import * as actions from "store/actions";
import { getUrlParams, get10BitRandomStr } from "utils/index";
import { moduleConfig } from "constants/index";
import {
  Input,
  Radio,
  DatePicker,
  Space,
  Table,
  Select,
  message,
  Button,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import "./index.less";
const radioOptions = [
  { label: "通过", value: "yes" },
  { label: "不通过", value: "no" },
];
const renderModuleOptions = () => {
  return moduleConfig.map((item) => {
    return <Option key={item.value}>{item.label}</Option>;
  });
};
const initDataItem = {
  module: "uve",
  bugLink: "",
};

@withRouter
@autobind
class SendReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: {},
      testResult: "yes", // 测试结果
      testContent: "", // 测试内容
      testProblem: "", // 测试遇到的问题
      taskName: "", // 项目名称

      columns: [
        {
          title: "模块",
          dataIndex: "module",
          key: "module",
          render: (text) => (
            <Select
              defaultValue="uve"
              onChange={() => {}}
              className="sendReportItemSelect"
              value={text}
            >
              {renderModuleOptions()}
            </Select>
          ),
        },
        {
          title: "Bug链接",
          key: "bugLink",
          dataIndex: "bugLink",
          render: () => (
            <>
              <Input
                placeholder="请填写Bug链接"
                // value={mid}
                // onChange={this.handleMidChange}
                className="sendReportItemSelect bugLinkInput"
              />
            </>
          ),
        },
        {
          title: "操作",
          key: "actionKey",
          render: (actionKey) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    this.handleAddBug(actionKey);
                  }}
                >
                  添加
                </a>
                <a
                  onClick={() => {
                    this.handleDeleteBug(actionKey);
                  }}
                >
                  删除
                </a>
              </Space>
            );
          },
        },
      ],
      tableData: [
        {
          key: get10BitRandomStr(10),
          ...initDataItem,
        },
      ],
    };
  }

  componentDidMount() {
    this.handleGetUrlParams();
  }

  handleAddBug = (item) => {
    this.bottomDiv.scrollIntoView();
    const { tableData } = this.state;
    tableData.splice(tableData.indexOf(item), 0, {
      key: get10BitRandomStr(10),
      ...initDataItem,
    });
    this.setState({
      tableData: [...tableData],
    });
  };

  handleDeleteBug = (item) => {
    const { tableData } = this.state;
    if (tableData.length === 1) {
      message.destroy();
      message.info("不能删除最后一项");
      return;
    }
    tableData.splice(tableData.indexOf(item), 1);
    this.setState({
      tableData: [...tableData],
    });
  };

  handleGetUrlParams = () => {
    const urlObj = getUrlParams();
    this.setState({
      urlParams: urlObj,
      taskName: R.pathOr("", ["task_name"], urlObj),
    });
  };

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

  handleTaskNameChange = (val) => {
    this.setState({
      taskName: val,
    });
  };

  renderBreadcrumb = () => <RightConBreadcrumb text="发送测试报告" />;

  renderForm = () => {
    const task_name = R.pathOr("", ["state", "urlParams", "task_name"], this);
    const columns = R.pathOr([], ["state", "columns"], this);
    const tableData = R.pathOr([], ["state", "tableData"], this);
    return (
      <>
        <RightConSubTitle text="填写测试报告" />
        <div className="inputArea">
          <div className="sendReportItem">
            <span className="inputText">项目名称</span>
            <SearchInput
              csName="sendReportItemSelect"
              placeholder="请填写项目名称"
              defaultVal={task_name}
              onValueChange={this.handleTaskNameChange}
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
              <RangePicker placeholder={["开始日期", "结束日期"]} />
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
            <span className="inputText">收件人员</span>
            <Input
              placeholder="逗号分割"
              // value={mid}
              // onChange={this.handleMidChange}
              className="sendReportItemSelect"
            />
            <span className="inputText">抄送人员</span>
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
              value={this.state.testResult}
            />
          </div>

          <div className="sendReportItem">
            <span className="inputText">测试内容</span>
            <TextArea
              style={{
                width: "90%",
                borderBottomLeftRadius: "5px",
                height: "80px",
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
                width: "90%",
                borderBottomLeftRadius: "5px",
                height: "80px",
              }}
              allowClear
              onChange={this.handleTestProblemChange}
              value={this.state.testProblem}
              className="textAreaDiv"
            ></TextArea>
          </div>
          <Table
            style={{ margin: "20px" }}
            columns={columns}
            dataSource={tableData}
            size="small"
            pagination={false}
          />
          <Button
            type="primary"
            size="middle"
            style={{ borderRadius: "5px", marginLeft: "20px" }}
            onClick={() => {}}
          >
            发送报告
          </Button>
          <div
            ref={(dom) => (this.bottomDiv = dom)}
            style={{ height: "0px", overflow: "hidden" }}
          ></div>
        </div>
      </>
    );
  };

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
