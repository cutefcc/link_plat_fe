import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import * as R from "ramda";
import autobind from "autobind-decorator";
// import { AlignLeftOutlined } from "@ant-design/icons";
import { Menu, Button } from "antd";
import {
  // AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  // MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
import "./index.less";

@withRouter
@autobind
class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleItemClick(item) {
    this.props.changeCheckedNav(item.key);
    if (item.routePath) {
      this.props.history.push(item.routePath);
    }
  }

  toggleCollapsed() {
    this.props.changeLeftNavStatus(!this.props.leftNavStatus);
  }

  render() {
    const leftNavStatus = R.pathOr("", ["props", "leftNavStatus"], this);
    return (
      <>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{
            marginBottom: 16,
            position: "absolute",
            left: !leftNavStatus ? "180px" : "80px",
            top: "5px",
          }}
        >
          {React.createElement(
            this.props.leftNavStatus ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.leftNavStatus}
          className="menuUl"
        >
          <SubMenu key="sub1" icon={<PieChartOutlined />} title="联调环境管理">
            <Menu.Item
              key="5"
              onClick={() => {
                this.props.history.push("/alreadyEnv");
              }}
            >
              已有环境列表
            </Menu.Item>
            <Menu.Item
              key="6"
              onClick={() => {
                this.props.history.push("/debugTool");
              }}
            >
              debug工具详情页
            </Menu.Item>
            <Menu.Item
              key="7"
              onClick={() => {
                this.props.history.push("/sendReport");
              }}
            >
              发送测试报告
            </Menu.Item>
            <Menu.Item
              key="8"
              onClick={() => {
                this.props.history.push("/searchMid");
              }}
            >
              查询mid页
            </Menu.Item>
            <Menu.Item
              key="9"
              onClick={() => {
                this.props.history.push("/mockUve");
              }}
            >
              <span title="mockUVE返回数据">mockUVE返回数据</span>
            </Menu.Item>
            <Menu.Item
              key="10"
              onClick={() => {
                this.props.history.push("/mockSfst");
              }}
            >
              mockSFST返回数据
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="2"
            onClick={() => {
              this.props.history.push("/smartBuild");
            }}
            icon={<DesktopOutlined />}
          >
            智能搭建环境
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              this.props.history.push("/newEnv");
            }}
            icon={<ContainerOutlined />}
          >
            新建联调环境
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              this.props.history.push("/countPage");
            }}
            icon={<ContainerOutlined />}
          >
            统计页面展示
          </Menu.Item>
        </Menu>
      </>
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
    changeCheckedNav: (key) => {
      dispatch(actions.changeCheckedNav(key));
    },
    // change left nav status
    changeLeftNavStatus: (payload) => {
      dispatch(actions.changeLeftNavStatus(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
