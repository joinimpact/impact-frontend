export function throttle(func: (...args: any[]) => any, ms: number) {
  let isThrottled = false;
  let savedArgs: any[] | null = null;
  let savedThis = this;

  function wrapper(...args: any[]) {

    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    func.apply(this, args);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
