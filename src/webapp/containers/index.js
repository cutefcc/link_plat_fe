import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "store/actions";
import TopHeader from "components/header";
import AlreadyEnv from "components/Content/AlreadyEnv";
import SmartBuild from "components/Content/SmartBuild";
import NewEnv from "components/Content/NewEnv";
import SendReport from "components/Content/SendReport";
import CountPage from "components/Content/CountPage";
import MockUve from "components/Content/MockUve";
import MockSfst from "components/Content/MockSfst";
import SearchMid from "components/Content/SearchMid";
import DebugTool from "components/Content/DebugTool";
import LeftNav from "components/leftNav/index";
import RefreshLeftNavChecked from "utils/refreshLeftNavChecked";

import "./index.less";
import { Layout } from "antd";

function App(props) {
  const { dispatch } = props;
  const ref = useRef();
  useEffect(() => {
    ref.current.handleLeftNavChecked(); // 切换leftNav 选择状态
    dispatch(
      actions.saveLeftNavCheckedMethod(ref.current.handleLeftNavChecked)
    );
  }, []);

  return (
    <BrowserRouter>
      {/* <Switch> */}
      <Layout className="layout">
        <TopHeader />
        <div className="mainContainer">
          <LeftNav />
          <Route path="/" exact component={AlreadyEnv} />
          <Route path="/alreadyEnv" component={AlreadyEnv} />
          <Route path="/smartBuild" component={SmartBuild} />
          <Route path="/newEnv" component={NewEnv} />
          <Route path="/sendReport" component={SendReport} />
          <Route path="/countPage" component={CountPage} />
          <Route path="/mockUve" component={MockUve} />
          <Route path="/mockSfst" component={MockSfst} />
          <Route path="/searchMid" component={SearchMid} />
          <Route path="/debugTool" component={DebugTool} />
        </div>
        <RefreshLeftNavChecked ref={ref} dispatch={dispatch} />
      </Layout>
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default connect((state, dispatch) => ({
  dispatch,
}))(App);

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collapsed: false,
//     };
//   }
//   componentDidMount() {
//     this.handleLeftNavChecked();
//   }
//   handleLeftNavChecked() {
//     console.log('this.refreshLeftNav', this.refreshLeftNav)
//     // this.refreshLeftNav.current.handleLeftNavChecked();
//     // const pathName = window.location.pathname;
//     // this.props.changeCheckedNav(
//     //   pathName === "/"
//     //     ? "5"
//     //     : R.pathOr("5", [pathName.slice(1), "key"], leftNavConfig)
//     // );
//   }
//   toggle() {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   }
//   render() {
//     return (
//       <BrowserRouter>
//         {/* <Switch> */}
//         <Layout className="layout">
//           <TopHeader />
//           <div className="mainContainer">
//             <LeftNav />
//             <Route path="/" exact component={AlreadyEnv} />
//             <Route path="/alreadyEnv" component={AlreadyEnv} />
//             <Route path="/smartBuild" component={SmartBuild} />
//             <Route path="/newEnv" component={NewEnv} />
//             <Route path="/sendReport" component={SendReport} />
//             <Route path="/countPage" component={CountPage} />
//             <Route path="/mockUve" component={MockUve} />
//             <Route path="/mockSfst" component={MockSfst} />
//             <Route path="/searchMid" component={SearchMid} />
//             <Route path="/debugTool" component={DebugTool} />
//           </div>
//           <RefreshLeftNavChecked ref={refreshLeftNav => this.refreshLeftNav = refreshLeftNav}/>
//         </Layout>
//         {/* </Switch> */}
//       </BrowserRouter>
//     );
//   }
// }

// // 用于建立组件跟store的state的映射关系 将 redux 中的 state传给 App
// // 作为一个函数，它可以传入两个参数，结果一定要返回一个object
// // 传入mapStateToProps之后，会订阅store的状态改变，在每次store的state发生变化的时候，都会被调用
// let mapStateToProps = (state) => {
//   return {
//     ...state,
//   };
// };
// // 建立组件跟store.dispatch的映射关系，在组件里面调用 this.props.onchangegreen 就会调用 store.dispatch 去派发给 reducer 修改数据
// // 可以是一个object，也可以传入函数
// let mapDispatchToProps = (dispatch) => {
//   return {
//     changeCheckedNav: (key) => {
//       dispatch(actions.changeCheckedNav(key));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
