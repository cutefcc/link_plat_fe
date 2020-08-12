import React from "react";
import { connect } from "react-redux";
import RightConSubTitle from "commonComponents/RightConSubTitle";
import { Input, Button } from "antd";
const { TextArea } = Input;
import prettyHtml from "json-pretty-html";
import "./index.less";

function JsonShow(props) {
  const { jsonStr = "", json, onJsonChange, title = "" } = props;
  return (
    <>
      <RightConSubTitle text={title} />
      <div className="jsonEdit">
        <TextArea
          style={{ width: "50%", borderBottomLeftRadius: "5px" }}
          allowClear
          onChange={onJsonChange}
          value={jsonStr}
          className="textAreaDiv"
        ></TextArea>
        <div
          className="jsonShow"
          dangerouslySetInnerHTML={{
            __html: json === "" ? "" : prettyHtml(json),
          }}
        ></div>
      </div>
      <div className="bottomBtn">
        <Button
          type="primary"
          style={{ borderRadius: "5px", marginLeft: "20px" }}
        >
          提交
        </Button>
      </div>
    </>
  );
}

export default connect((state, dispatch) => ({
  dispatch,
}))(JsonShow);
