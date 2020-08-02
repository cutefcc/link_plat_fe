import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../store/actions';
import * as R from 'ramda'
import autobind from 'autobind-decorator'
import { WeiboOutlined, DoubleLeftOutlined,AlignLeftOutlined } from '@ant-design/icons';
import './index.less';

@withRouter
@autobind
class LeftNav extends React.Component {
    constructor(props) {
        super(props);
    }
    handleItemClick(item) {
        this.props.changeCheckedNav(item.key)
        if (item.routePath) {
            this.props.history.push(item.routePath)
        }
    }
    renderLeftVavItem(item) {
        const checkedNav = R.pathOr([], ['props', 'checkedNav'], this)
        console.log('checkedNav', checkedNav)
        return <div className={`leftNavItem ${checkedNav === item.key ? 'current' : ''} `} key={item.key} onClick={() => { this.handleItemClick(item) }}>
            <AlignLeftOutlined />
            <span className="leftNavText">{item.text}</span>
        </div>
    }

    render() {
        const leftNav = R.pathOr([], ['props', 'leftNav'], this)
        return <div className="leftNav">
            {leftNav.map(this.renderLeftVavItem)}
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        ...state
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeCheckedNav: (key) => {
            dispatch(actions.changeCheckedNav(key))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
