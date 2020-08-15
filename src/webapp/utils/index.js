import * as R from "ramda";
import urlParse from "url";
export const debounce = (fn, tm) => {
  let timer = null;
  return (...argu) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...argu);
    }, tm);
  };
};
export const closure = (fn, tm) => {
  let canRun = true;
  let timer = null;
  return (...argu) => {
    if (!canRun) return;
    canRun = false;
    timer = setTimeout(() => {
      canRun = true;
      // eslint-disable-next-line no-unused-vars
      timer = null;
      fn.call(this, ...argu);
    }, tm);
  };
};
export const getUrlParams = () => {
  return R.pathOr({}, ["query"], urlParse.parse(window.location.href, true));
};
export const get10BitRandomStr = (len) => {
  len = len || 32;
  var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  var maxPos = $chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
