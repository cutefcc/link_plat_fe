import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as R from 'ramda'
import autobind from 'autobind-decorator'
import { Select, Radio, Input, Button } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import {services, styles} from '../../../constants/mockUve'
import prettyHtml from 'json-pretty-html';
import './index.less';

@withRouter
@autobind
class MockUve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {
                "id": 2,
                "name": "An ice sculpture",
                "price": 12.50,
                "tags": ["cold", "ice"],
                "dimensions": {
                  "length": 7.0,
                  "width": 12.0,
                  "height": 9.5
                },
                "warehouseLocation": {
                  "latitude": -78.75,
                  "longitude": 20.4
                }
            }
        }
    }

    handleChange() {

    }

    handleJsonChange(e) {
        console.log(e.target.value)
        this.setState({
            json: JSON.parse(e.target.value)
        })
    }

    renderServicesOptions(item) {
        return services.map(item => {
            return <Option key={item.value}>{item.text}</Option>
        }) 
    }

    renderStylesOptions(item) {
        return styles.map(item => {
            return <Option key={item.value}>{item.text}</Option>
        }) 
    }

    render() {
        console.log(prettyHtml(this.state.json, this.state.json.dimensions))
        return <div className="mockUve">
            <div className="mockUveItem">
                <span>选择场景：</span>
                <Select defaultValue="main_feed" onChange={this.handleChange} className="mockUveItemSelect">
                    {this.renderServicesOptions()}
                </Select>
                <span>选择样式：</span>
                <Select defaultValue="see_download" onChange={this.handleChange} className="mockUveItemSelect">
                    {this.renderStylesOptions()}
                </Select>
                <span>指定mid：</span>
                <Input placeholder="" className="mockUveItemSelect" />
            </div>
            <div className="mockUveItem">
                <span>指定promotion_objective：</span>
                <Input placeholder="营销目标" className="mockUveItemSelect" />
                <span>指定optimization_objective：</span>
                <Input placeholder="优化目标" className="mockUveItemSelect" />
            </div>
            <div>
                <Button type="primary" style={{marginRight: '10px'}}>生成</Button>
                <Button type="primary">预览</Button>
            </div>
            
            <div className="jsonEdit">
                <TextArea style={{width: '50%', resize: 'none'}} allowClear onChange={this.handleJsonChange}>{JSON.stringify(this.state.json)}</TextArea>
                <div className="jsonShow" dangerouslySetInnerHTML={{__html: prettyHtml(this.state.json, this.state.json.dimensions)}}></div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MockUve);
