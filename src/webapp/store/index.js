import reducer from "./reducer";
import * as Redux from "redux";
// import thunkMiddleware from 'redux-thunk';// 这个中间件可以支持 异步数据
import myThunkMiddleware from "../middleware/myThunkMiddleware";
import myLogMiddleware from "../middleware/myLogMiddleware";

let initState = {
  info: {
    name: "小明",
    age: 28,
    job: "qunar",
    address: "北京",
  },
  computer: {
    color: "red",
    size: 15,
    prize: 20000,
  },
  leftNav: [
    {
      text: "已有环境",
      key: "alreadyEnv",
      routePath: "/alreadyEnv",
    },
    {
      text: "智能搭建环境",
      key: "smartBuild",
      routePath: "/smartBuild",
    },
    {
      text: "新建联调环境",
      key: "newEnv",
      routePath: "/newEnv",
    },
    {
      text: "发送测试报告",
      key: "sendReport",
      routePath: "/sendReport",
    },
    {
      text: "查看测试报告",
      key: "viewReport",
      routePath: "/viewReport",
    },
    {
      text: "查询MID详情页",
      key: "searchMid",
      routePath: "/searchMid",
    },
    {
      text: "mockUVE返回数据",
      key: "mockUve",
      routePath: "/mockUve",
    },
    {
      text: "mockSFST数据返回",
      key: "mockSFST",
      routePath: "/mockSFST",
    },
    {
      text: "统计页面",
      key: "countPage",
      routePath: "/countPage",
    },
  ],
  leftNavStatus: false, // true false
  checkedNav: "", // checkedNav key
  envLists: [],
};
const store = Redux.createStore(
  reducer,
  initState,
  Redux.applyMiddleware(myLogMiddleware, myThunkMiddleware)
);
//Redux.applyMiddleware(thunkMiddleware) 运行结束返回了一个方法，这个方法接收一个参数 createStore 这个方法
export default store;
