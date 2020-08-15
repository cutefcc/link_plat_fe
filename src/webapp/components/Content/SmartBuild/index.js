import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as R from "ramda";
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import { Input, Table, Button, Space, Select, message } from "antd";
const { Option } = Select;
import { get10BitRandomStr } from "utils/index";
import { moduleConfig } from "constants/index";
import "./index.less";

const initDataItem = {
  module: "uve",
  bugLink: "",
};
const renderModuleOptions = () => {
  return moduleConfig.map((item) => {
    return <Option key={item.value}>{item.label}</Option>;
  });
};

@withRouter
@autobind
class SmartBuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectInfo: "",

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
          title: "代码分支",
          key: "bugLink",
          dataIndex: "bugLink",
          render: () => (
            <>
              <Input
                placeholder="请填写代码分支"
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
                    this.handleAdd(actionKey);
                  }}
                >
                  添加
                </a>
                <a
                  onClick={() => {
                    this.handleDelete(actionKey);
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

  handleAdd = (item) => {
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

  handleDelete = (item) => {
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

  handleProjectNameChange = (val) => {
    this.setState({
      projectName: val,
    });
  };

  handleProjectInfoChange = (val) => {
    this.setState({
      projectInfo: val,
    });
  };

  renderBreadcrumb = () => <RightConBreadcrumb text="智能搭建环境" />;

  renderForm = () => {
    return (
      <>
        <RightConSubTitle text="表单" />
        <div className="inputArea">
          <div className="smartBuildItem">
            <span className="inputText">项目名称</span>
            <Input
              placeholder="请填写项目名称"
              className="smartBuildItemSelect"
              onChange={this.handleProjectNameChange}
            />
            <span className="inputText">项目描述</span>
            <Input
              placeholder="请填写项目描述"
              className="smartBuildItemSelect"
              onChange={this.handleProjectInfoChange}
            />
          </div>
          {this.renderTable()}
        </div>
      </>
    );
  };

  renderTable = () => {
    const columns = R.pathOr([], ["state", "columns"], this);
    const tableData = R.pathOr([], ["state", "tableData"], this);
    return (
      <>
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
          智能创建项目
        </Button>
        <div
          ref={(dom) => (this.bottomDiv = dom)}
          style={{ height: "0px", overflow: "hidden" }}
        ></div>
      </>
    );
  };

  render() {
    return (
      <div className="rightCon smartBuild">
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

export default connect(mapStateToProps, mapDispatchToProps)(SmartBuild);
