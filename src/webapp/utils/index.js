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
