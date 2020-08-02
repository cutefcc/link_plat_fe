import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import autobind from 'autobind-decorator'

const { SubMenu } = Menu;
const { Sider } = Layout;
@autobind
class About extends Component {
    constructor(props) {
        super(props);
    }
    handleJumpRoute(route) {
      this.props.history.push(route);
      console.log('当前前端路由---', route);
    }
    render() {
        return <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['5']}
          defaultOpenKeys={['sub2']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                nav 1-1
            </span>
            }
          >
            <Menu.Item key="1" onClick={() => {this.handleJumpRoute('/nav1/about')} }>Redux 演示</Menu.Item>
            <Menu.Item key="2" onClick={() => {this.handleJumpRoute('/nav1/Nav1LongList')} }>react渲染长列表</Menu.Item>
            <Menu.Item key="3" onClick={() => {this.handleJumpRoute('/nav1/Nav1React168')} }>react16.8新特性</Menu.Item>
            <Menu.Item key="4" onClick={() => {this.handleJumpRoute('/nav1/Nav1PureComponent')} }>PureComponent相关</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                hooks 演示
            </span>
            }
          >
            {/* <Menu.Item key="5" onClick={() => {this.handleJumpRoute('/nav1/Nav1ClassState')} }>class 的 setState</Menu.Item> */}
            <Menu.Item key="6" onClick={() => {this.handleJumpRoute('/nav1/Nav1UseState')} }>useState useEffect</Menu.Item>
            {/* <Menu.Item key="7" onClick={() => {this.handleJumpRoute('/nav1/Nav1Memo')} }>hook 的 memo</Menu.Item> */}
            <Menu.Item key="8" onClick={() => {this.handleJumpRoute('/nav1/Nav1Context')} }>hook 的 Context</Menu.Item>
            <Menu.Item key="9" onClick={() => {this.handleJumpRoute('/nav1/Nav1Error')} }>hook 的 Error组件</Menu.Item>
            <Menu.Item key="10" onClick={() => {this.handleJumpRoute('/nav1/Nav1UseRef')} }>hook 的 Ref</Menu.Item>
            <Menu.Item key="11" onClick={() => {this.handleJumpRoute('/nav1/Nav1Memo1')} }>memo demo1</Menu.Item>
            {/* <Menu.Item key="12" onClick={() => {this.handleJumpRoute('/nav1/Nav1Memo2')} }>memo demo2</Menu.Item> */}
            <Menu.Item key="13" onClick={() => {this.handleJumpRoute('/nav1/Nav1Memo3')} }>memo demo3</Menu.Item>
            <Menu.Item key="14" onClick={() => {this.handleJumpRoute('/nav1/Nav1Memo4')} }>memo demo4</Menu.Item>
            <Menu.Item key="15" onClick={() => {this.handleJumpRoute('/nav1/Nav1Memo5')} }>memo demo5</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                nav 1-3
            </span>
            }
          >
            <Menu.Item key="50">option9</Menu.Item>
            <Menu.Item key="51">option10</Menu.Item>
            <Menu.Item key="52">option11</Menu.Item>
            <Menu.Item key="53">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    }
}
export default About;


