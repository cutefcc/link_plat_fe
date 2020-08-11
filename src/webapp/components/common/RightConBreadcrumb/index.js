import React from "react";
import { connect } from "react-redux";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
function RightConBreadcrumb(props) {
  const { text = "" } = props;
  return (
    <Breadcrumb separator="" style={{ marginBottom: "10px", fontSize: "12px" }}>
      <Breadcrumb.Item href="">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>{text}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default connect((state, dispatch) => ({
  dispatch,
  s: state,
}))(RightConBreadcrumb);
