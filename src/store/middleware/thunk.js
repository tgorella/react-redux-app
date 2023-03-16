export function thunk({getState, dispatch}) {
  return function wrapDispatch(next) {
    return function handleActiob(action) {
      if (typeof action === "function") {
				action(dispatch, getState)
      } else {
        return next(action);
      }
    };
  };
}
