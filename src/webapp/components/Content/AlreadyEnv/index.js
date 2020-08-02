import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as R from 'ramda'
import autobind from 'autobind-decorator'
import './index.less';

@withRouter
@autobind
class AlreadyEnv extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="alreadyEnv">
            alreadyEnv
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
        changeName: () => {
            dispatch(actions.changeName())
        },
        changeAge: () => {
            dispatch(actions.changeAge())
        },
        changeAsyncData: () => {
            // 为什么 异步actions 时 在actions 里面已经 dispatch 了，这里还要 dispatch
            dispatch(actions.changeAsyncData());
        },
        changeComputerSize: () => {
            dispatch(actions.changeComputerSize());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlreadyEnv);
