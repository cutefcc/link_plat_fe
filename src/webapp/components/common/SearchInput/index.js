import React, { useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";

const { Option } = Select;
import "./index.less";

function SearchInput(props) {
  const { csName, envLists, placeholder = "", val = "" } = props;
  const [value, setValue] = useState(val);
  const [data, setData] = useState([]); // 根据输入的部分数据 查找出来符合要求的数组
  const handleSearch = (value) => {
    const filterArr = envLists.filter((item) => item.envName.match(value));
    if (value) {
      setValue(value);
      console.log("val", value);
      if (filterArr.length > 0) {
        setData(envLists.filter((item) => item.envName.match(value)));
      } else {
        setData([]);
      }
    }
  };

  const handleChange = (value) => {
    console.log("val", value);
    setValue(value);
  };

  const handleGetOptions = () =>
    data.map((d) => <Option key={d.envName}>{d.envName}</Option>);

  return (
    <>
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        className={csName}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
      >
        {handleGetOptions()}
      </Select>
    </>
  );
}

export default connect((state, dispatch) => ({
  dispatch,
  envLists: state.envLists,
}))(SearchInput);
