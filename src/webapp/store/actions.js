import { types } from "constants/index";
import fetch from "cross-fetch";

export function changeName() {
  return { type: types.CHANGE_NAME };
}
export function changeAge() {
  return { type: types.CHANGE_AGE };
}
export function changeComputerSize() {
  return { type: types.CHANGE_COMPUTER_SIZE };
}
export function changeAsyncData() {
  // eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {
    fetch("/api/test")
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        dispatch({ type: types.CHANGE_ASYNCDATA, resp: resp });
      });
  };
}
export function changeCheckedNav(key) {
  return { type: types.CHANGE_CHECKEDNAV, key };
}
export function setEnvLists(payload) {
  return { type: types.SET_ENVLISTS, payload };
}
export function changeLeftNavStatus(status) {
  return { type: types.CHANGE_LEFTNAVSTATUS, payload: status };
}
export function saveLeftNavCheckedMethod(fn) {
  return { type: types.SAVE_LEFTNAVCHECKEDMETHOD, payload: fn };
}
