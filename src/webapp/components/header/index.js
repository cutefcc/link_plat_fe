import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux'
import autobind from 'autobind-decorator';
import { EnvironmentOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions';
import * as R from 'ramda';
import './index.less';
const { Header } = Layout;
@withRouter
@autobind
class TopHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    handleLogoClick() {
        this.props.history.push('/');
    }
    render() {
        const checkedNav = R.pathOr('', ['props', 'checkedNav'], this)
        const checkedNavObj = R.pathOr({}, ['props', 'leftNav'], this).find(item => item.key === checkedNav)
        console.log('checkedNavObj', checkedNavObj)
        return <Header className="topHeader">
            <div className="logo" onClick={this.handleLogoClick}>
                <img className="logoImg" src="./static/img/weibo_logo.png" />
                <div className="logoText">流量引擎联调平台</div>
            </div>
            <div className="checkedNav">
                    <EnvironmentOutlined />
                    <span>{` ${checkedNavObj.text}`}</span>
            </div>
            {checkedNav === 'mockUve' && <div className="tip">mock 10.79.40.125:8667 返回</div>}
        </Header>
    }
}


let mapStateToProps = (state) => {
    return {
        ...state
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        // changeCheckedNav: (key) => {
        //     dispatch(actions.changeCheckedNav(key))
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
