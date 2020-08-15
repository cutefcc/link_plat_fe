import React, { forwardRef, useImperativeHandle } from "react";
import * as R from "ramda";
import { leftNavConfig } from "constants/leftNav";
import * as actions from "store/actions";

const RefreshLeftNavChecked = forwardRef((props, ref) => {
  const { dispatch } = props;
  useImperativeHandle(ref, () => ({
    handleLeftNavChecked() {
      const pathName = window.location.pathname;
      dispatch(
        actions.changeCheckedNav(
          pathName === "/"
            ? "5"
            : R.pathOr("5", [pathName.slice(1), "key"], leftNavConfig)
        )
      );
    },
  }));
  return <></>;
});

export default RefreshLeftNavChecked;
