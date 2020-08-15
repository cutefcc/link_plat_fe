function myLogMiddleware() {
  // eslint-disable-next-line no-unused-vars
  return ({ dispatch, getState }) => (next) => (action) => {
    // console.log("will dispatch", action, dispatch);
    let returnValue = next(action);
    // console.log("state after dispatch", getState());
    return returnValue;
  };
}

export default myLogMiddleware();
