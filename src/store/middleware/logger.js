export function logger(state) {
  return function wrapDispatch(next) {
    return function handleActiob(action) {


      return next(action);
    };
  };
}
