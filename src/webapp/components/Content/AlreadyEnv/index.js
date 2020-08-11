import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import fetch from "cross-fetch";
// import * as R from 'ramda'
import RightConSubTitle from "commonComponents/RightConSubTitle";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import autobind from "autobind-decorator";
import { Table, Space, Input, Tabs, Pagination, Button } from "antd";
const { Column } = Table;
const { TabPane } = Tabs;

const { Search } = Input;
import "./index.less";

@withRouter
@autobind
class AlreadyEnv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      envLists: [],
      envListsLoading: false,
      expiredLists: [],
      expiredListsLoading: false,

      evnListsOpts: [
        "diagnosis",
        "over",
        "sendReport",
        "midSearch",
        "mockUVE",
        "mockSFST",
      ],
      activeTabKey: "1", // 1 进行中 2 已结束

      page: 1,
      size: 10,

      search: false,

      searchValue: "",
    };
  }

  componentDidMount() {
    // 获取进行中项目lists
    this.handleGetEnvsLists();
    // 获取已结束项目lists
    this.handleGetExpiredEnvsLists();
  }

  handleGetEnvsLists() {
    const { evnListsOpts, page, size } = this.state;
    this.setState({
      envListsLoading: true,
    });
    fetch("/api/getEnvsLists")
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        // 数据处理，适应表格的数据格式
        let envLists = [];
        if (Array.isArray(resp)) {
          envLists = resp.map((item, index) => {
            return {
              key: `${index + 1}`,
              envName: item[0],
              uvePort: item[2],
              debugModule: Object.keys(
                JSON.parse(item[1].replace(/'/g, '"'))
              ).join(" "),
              projectInfo: item[3],
              time: item[4],
              opt: evnListsOpts,
            };
          });
          this.setState({
            envLists,
            envListsLoading: false,
            showEnvLists: envLists.slice((page - 1) * size, page * size),
          });
        }
      });
  }

  handleGetExpiredEnvsLists() {
    const { page, size } = this.state;
    this.setState({
      expiredListsLoading: true,
    });
    fetch("/api/getExpiredEnvsLists")
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        // 数据处理，适应表格的数据格式
        let expiredLists = [];
        if (Array.isArray(resp)) {
          expiredLists = resp.map((item, index) => {
            return {
              key: `${index + 1}`,
              envName: item[0],
              uvePort: item[2],
              debugModule: Object.keys(
                JSON.parse(item[1].replace(/'/g, '"'))
              ).join(" "),
              projectInfo: item[3],
              time: item[4],
              opt: ["viewDetail"],
            };
          });
          this.setState({
            expiredLists,
            expiredListsLoading: false,
            showExpiredLists: expiredLists.slice(
              (page - 1) * size,
              page * size
            ),
          });
        }
      });
  }

  handlePageChange(page, size) {
    const { envLists, expiredLists, activeTabKey } = this.state;
    if (activeTabKey === "1") {
      this.setState({
        page,
        size,
        showEnvLists: envLists.slice((page - 1) * size, page * size),
      });
    } else {
      this.setState({
        page,
        size,
        showExpiredLists: expiredLists.slice((page - 1) * size, page * size),
      });
    }
  }

  handleSearch(value) {
    const { activeTabKey, envLists, expiredLists } = this.state;
    let res = [];
    if (activeTabKey === "1") {
      res = envLists.filter((item) => {
        return item.envName.match(value);
      });
      this.setState({
        showEnvLists: res,
        search: "1",
        searchValue: value,
      });
    }
    if (activeTabKey === "2") {
      res = expiredLists.filter((item) => {
        return item.envName.match(value);
      });
      this.setState({
        showExpiredLists: res,
        search: "2",
        searchValue: value,
      });
    }
  }

  handleClear() {
    const { envLists, expiredLists } = this.state;
    this.setState({
      showEnvLists: envLists,
      showExpiredLists: expiredLists,
      page: 1,
      size: 10,
      search: false,
      searchValue: "",
    });
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="已有环境列表" />;

  renderTopSearch() {
    const { searchValue } = this.state;
    return (
      <>
        <RightConSubTitle text="按环境名称搜索" />
        <div className="inputArea">
          <div className="inputAreaItem">
            <Search
              placeholder="输入项目名称"
              onSearch={(value) => {
                this.handleSearch(value);
              }}
              onChange={(e) => {
                this.setState({
                  searchValue: e.target.value,
                });
              }}
              style={{ width: 200 }}
              value={this.state.searchValue}
            />
            {searchValue !== "" && (
              <Button
                type="primary"
                style={{ marginLeft: "20px", borderRadius: "5px" }}
                onClick={this.handleClear}
              >
                清空
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }

  renderTables() {
    const {
      envLists,
      expiredLists,
      showEnvLists,
      showExpiredLists,
      envListsLoading,
      expiredListsLoading,
      activeTabKey,
      page,
      search,
    } = this.state;
    return (
      <>
        <RightConSubTitle text="环境列表展示" />
        <div className="talbeArea">
          <Tabs
            defaultActiveKey="1"
            onChange={(key) => {
              if (search === "1" || search === "2") {
                // 搜索状态，且是 进行中
                // if (key === '1' && key === activeTabKey) {
                //   this.setState({
                //     showExpiredLists: expiredLists.slice((page - 1) * size, page * size)
                //   })
                // }
                // if (key === '2') {

                // }
                this.setState({
                  activeTabKey: key,
                  // page: 1,
                  // size: 10,
                });
              } else {
                this.handlePageChange(1, 20);
                this.setState({
                  activeTabKey: key,
                  page: 1,
                  size: 10,
                });
              }
            }}
            centered
          >
            <TabPane tab="进行中项目" key="1">
              <Table
                dataSource={showEnvLists}
                pagination={false}
                loading={envListsLoading}
                scroll={{ x: 1300 }}
              >
                <Column title="编号" dataIndex="key" key="key" />
                <Column title="环境名称" dataIndex="envName" key="envName" />
                <Column title="端口" dataIndex="uvePort" key="uvePort" />
                <Column
                  title="参与联调模块"
                  dataIndex="debugModule"
                  key="debugModule"
                />
                <Column
                  title="项目描述"
                  dataIndex="projectInfo"
                  key="projectInfo"
                />
                <Column title="创建时间" dataIndex="time" key="time" />
                <Column
                  title={() => {
                    return <div onClick={() => {}}>操作</div>;
                  }}
                  key="opt"
                  // style={{ textAlign: 'center' }}
                  render={(item) => {
                    return (
                      <Space>
                        {/* <div> */}
                        {item.opt.includes("diagnosis") && (
                          <Button
                            type="primary"
                            size="small"
                            style={{ borderRadius: "5px" }}
                            onClick={() => {
                              this.props.history.push("/debugTool");
                            }}
                          >
                            诊断
                          </Button>
                        )}
                        {item.opt.includes("sendReport") && (
                          <Button
                            type="primary"
                            size="small"
                            style={{ borderRadius: "5px" }}
                            onClick={() => {
                              this.props.history.push("/sendReport");
                            }}
                          >
                            发送报告
                          </Button>
                        )}
                        {item.opt.includes("midSearch") && (
                          <Button
                            type="primary"
                            size="small"
                            style={{ borderRadius: "5px" }}
                            onClick={() => {
                              this.props.history.push("/searchMid");
                            }}
                          >
                            mid查询
                          </Button>
                        )}
                        {/* </div>
                    <div> */}
                        {item.opt.includes("mockUVE") && (
                          <Button
                            type="primary"
                            size="small"
                            style={{ borderRadius: "5px" }}
                            onClick={() => {
                              this.props.history.push("/mockUve");
                            }}
                          >
                            mock UVE
                          </Button>
                        )}
                        {item.opt.includes("mockSFST") && (
                          <Button
                            type="primary"
                            size="small"
                            style={{ borderRadius: "5px" }}
                            onClick={() => {
                              this.props.history.push("/mockSfst");
                            }}
                          >
                            mock SFST
                          </Button>
                        )}
                        {item.opt.includes("over") && (
                          <Button
                            type="primary"
                            size="small"
                            danger
                            style={{ borderRadius: "5px" }}
                          >
                            结束联调
                          </Button>
                        )}
                        {/* </div> */}
                      </Space>
                    );
                  }}
                />
              </Table>
            </TabPane>
            <TabPane tab="已结束项目" key="2">
              <Table
                dataSource={showExpiredLists}
                pagination={false}
                loading={expiredListsLoading}
              >
                <Column title="编号" dataIndex="key" key="key" width={60} />
                <Column title="环境名称" dataIndex="envName" key="envName" />
                <Column title="uve端口" dataIndex="uvePort" key="uvePort" />
                <Column
                  title="参与联调模块"
                  dataIndex="debugModule"
                  key="debugModule"
                />
                <Column
                  title="项目描述"
                  dataIndex="projectInfo"
                  key="projectInfo"
                />
                <Column title="创建时间" dataIndex="time" key="time" />
                <Column
                  // fixed='right'
                  // width={200}
                  title="操作"
                  key="opt"
                  render={(item) => {
                    return (
                      <Space size="middle">
                        {item.opt.includes("viewDetail") && (
                          <Button
                            type="primary"
                            size="small"
                            style={{ borderRadius: "5px" }}
                          >
                            查看详情
                          </Button>
                        )}
                      </Space>
                    );
                  }}
                />
              </Table>
            </TabPane>
          </Tabs>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {!(search === activeTabKey) && (
              <Pagination
                size="small"
                defaultPageSize={10}
                current={page}
                onChange={this.handlePageChange}
                defaultCurrent={1}
                total={
                  activeTabKey === "1" ? envLists.length : expiredLists.length
                }
                showSizeChanger
                showQuickJumper
              />
            )}
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="rightCon alreadyEnv">
        {this.renderBreadcrumb()}
        {this.renderTopSearch()}
        {this.renderTables()}
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

export default connect(mapStateToProps, mapDispatchToProps)(AlreadyEnv);
