function throttle(fn, delay, options = {}) {
  const {
    leading = true,
    trailing = true
  } = options
  let timer = null
  let lastCallTime = 0
  let lastArgs = null
  let lastThis = null

  const invoke = () => {
    lastCallTime = Date.now()
    fn.apply(lastThis, lastArgs)
    lastArgs = lastThis = null
  }

  var throttled = function(...args) {
    var now = +new Date()
    
    if (!lastCallTime && !leading) {
      lastCallTime = now
    }

    const remaining = delay - (now - lastCallTime)
    lastArgs = args
    lastThis = this

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      invoke()
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        timer = null

        if (trailing && lastArgs) {
          invoke()
        }
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = null
    lastArgs = lastThis = null
    lastCallTime = 0
  }

  return throttled
}