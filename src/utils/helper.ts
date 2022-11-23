export function debounce(fn: Function, time: number): Function {
  let timeoutId: any
  return wrapper
  function wrapper(...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}
