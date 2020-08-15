import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";

const { Option } = Select;
import "./index.less";

function SearchInput(props) {
  const {
    csName,
    envLists,
    placeholder = "",
    defaultVal = "",
    onValueChange = () => {},
  } = props;
  const [value, setValue] = useState(defaultVal);
  const [data, setData] = useState([]); // 根据输入的部分数据 查找出来符合要求的数组

  useEffect(() => {
    setValue(defaultVal);
  }, [defaultVal]);

  const handleSearch = (value) => {
    const filterArr = envLists.filter((item) => item.envName.match(value));
    if (value) {
      setValue(value);
      onValueChange(value);
      if (filterArr.length > 0) {
        setData(envLists.filter((item) => item.envName.match(value)));
      } else {
        setData([]);
      }
    }
  };

  const handleChange = (value) => {
    setValue(value);
    onValueChange(value);
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
