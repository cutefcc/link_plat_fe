import { types } from "constants/index";
import { combineReducers } from "redux";

// reducer 拆分（每个 reducer 只负责管理全局 state 中它负责的一部分）
// 负责 info 部分
function info(state = {}, action) {
  switch (action.type) {
    case types.CHANGE_NAME:
      return {
        ...state,
        name: state.name === "小东" ? "小明" : "小东",
      };

    case types.CHANGE_AGE:
      return {
        ...state,
        age: state.age + 1,
      };

    default:
      return state;
  }
}

// 负责 computer 部分
function computer(state = {}, action) {
  switch (action.type) {
    case types.CHANGE_COMPUTER_SIZE:
      return {
        ...state,
        size: state.size - 1,
      };
    default:
      return state;
  }
}

// 负责 film 部分
function film(state = {}, action) {
  switch (action.type) {
    case types.CHANGE_ASYNCDATA:
      return {
        ...state,
        subjects: action.resp.subjects,
      };

    default:
      return state;
  }
}

function leftNav(state = {}, action) {
  switch (action.type) {
    case types.CHAGE_LEFTNAV:
      return "";

    default:
      return state;
  }
}
function checkedNav(state = {}, action) {
  switch (action.type) {
    case types.CHANGE_CHECKEDNAV:
      return action.key;

    default:
      return state;
  }
}
function leftNavStatus(state = {}, action) {
  switch (action.type) {
    case types.CHANGE_LEFTNAVSTATUS:
      return action.payload;

    default:
      return state;
  }
}
function envLists(state = {}, action) {
  switch (action.type) {
    case types.SET_ENVLISTS:
      return action.payload;

    default:
      return state;
  }
}
function checkLeftNavFn(state = {}, action) {
  switch (action.type) {
    case types.SAVE_LEFTNAVCHECKEDMETHOD:
      return action.payload;

    default:
      return state;
  }
}

// 在 redux 源码的 createStore 里面有一句    dispatch({ type: ActionTypes.INIT })
// 用一个不匹配任何 reducer 的 action 去调了下dispatch，会默认走每一个 reducer 的default 分支
// 生成一个空的 state 树 （如果在我们初始化createStore 时没有指定初始state的话）

// 导出一个大的 reducer
// export default function reducer(state = {}, action) {
//     return {
//         info: info(state.info, action),
//         computer: computer(state.computer, action)
//     }
// }

// 导出一个大的 reducer  与上面的写法效果是一致的，利用了 redux 的api去合并 reducer 代码更加简洁
const reducer = combineReducers({
  info,
  computer,
  film,
  leftNav,
  checkedNav,
  leftNavStatus,
  envLists,
  checkLeftNavFn,
});
export default reducer;
