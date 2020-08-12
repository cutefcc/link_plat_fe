import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import { Input } from "antd";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import SearchInput from "commonComponents/SearchInput";
import autobind from "autobind-decorator";
const { Search } = Input;
import "./index.less";

@withRouter
@autobind
class SearchMid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleSearch(value) {
    console.log("go search", value);
  }

  renderBreadcrumb = () => <RightConBreadcrumb text="查询mid页" />;

  renderInputArea() {
    return (
      <>
        <RightConSubTitle text="按mid搜索" />
        <div className="inputArea">
          <div className="inputAreaItem">
            <span className="inputText">项目名称</span>
            <SearchInput
              csName="searchMidSelect"
              placeholder="请填写项目名称"
            />
            <Search
              placeholder="输入mid"
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
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="rightCon searchMid">
        {this.renderBreadcrumb()}
        {this.renderInputArea()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchMid);
