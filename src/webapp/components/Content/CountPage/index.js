import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import * as R from 'ramda'
import autobind from "autobind-decorator";
import RightConBreadcrumb from "commonComponents/RightConBreadcrumb";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import { DatePicker, Space, Select, Button } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;
import "./index.less";

// 时间维度 配置
const timeDimensionCon = [
  { label: "月份统计", value: "month" },
  { label: "季度统计", value: "quarterly" },
  { label: "年度统计", value: "year" },
];
// 统计栏目 配置
const statisticsColumnCon = [
  { label: "全部", value: "all" },
  { label: "联调项目统计", value: "dubugProject" },
  { label: "各模块使用统计", value: "useStatus" },
  { label: "各模块bug数统计", value: "bugCount" },
];

@withRouter
@autobind
class CountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDimension: "month", // month  quarterly year
      statisticsColumn: "all", // all dubugProject useStatus  bugCount
    };
  }

  handleTimeDimensionChange = (val) => {
    this.setState({
      timeDimension: val,
    });
  };

  handlestatisticsColumnChange = (val) => {
    this.setState({
      statisticsColumn: val,
    });
  };

  handleSearch = () => {};

  renderTimeDimensionOptions = () => {
    return timeDimensionCon.map((item) => {
      return <Option key={item.value}>{item.label}</Option>;
    });
  };

  renderStatisticsColumnOptions = () => {
    return statisticsColumnCon.map((item) => {
      return <Option key={item.value}>{item.label}</Option>;
    });
  };

  renderBreadcrumb = () => <RightConBreadcrumb text="统计🧮页面展示" />;

  renderForm = () => {
    const { timeDimension, statisticsColumn } = this.state;
    return (
      <>
        <RightConSubTitle text="表单s" />
        <div className="inputArea">
          <div className="countPageItem">
            <span className="inputText">日期区间</span>
            <Space
              direction="vertical"
              size={12}
              className="countPageItemSelect"
            >
              <RangePicker placeholder={["开始日期", "结束日期"]} />
            </Space>
            <span className="inputText">时间维度</span>
            <Select
              defaultValue="main_feed"
              onChange={this.handleTimeDimensionChange}
              className="countPageItemSelect"
              value={timeDimension}
            >
              {this.renderTimeDimensionOptions()}
            </Select>
            <span className="inputText">统计栏目</span>
            <Select
              defaultValue="main_feed"
              onChange={this.handlestatisticsColumnChange}
              className="countPageItemSelect"
              value={statisticsColumn}
            >
              {this.renderStatisticsColumnOptions()}
            </Select>
            {/* <div className="btnArea"> */}
            <Button
              type="primary"
              style={{ borderRadius: "5px" }}
              onClick={this.handleSearch}
            >
              查询
            </Button>
            {/* </div> */}
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="rightCon countPage">
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

export default connect(mapStateToProps, mapDispatchToProps)(CountPage);
