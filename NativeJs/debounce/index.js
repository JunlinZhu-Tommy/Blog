const { useState, useEffect, useRef, useMemo } = require("react")

function debounce(fn, delay, immediate = false) {
  let timer = null

  function debounced(...args) {
    const context = this

    if (timer) {
      clearTimeout(timer)
    }
    
    const callNow = immediate && !timer
    
    timer = setTimeout(() => {
      timer = null
      if (!immediate) {
        fn.apply(context, args)
      }
    }, delay)

    if (callNow) {
      fn.apply(context, args)
    }
  }

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
}

function useDebounce(value, delay = 3000) {
  const [debouncedValue, setDebouncedValue] = useState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout()
  }, [value, delay])

  return debouncedValue
}

function useDebounceFn(fn, delay = 3000) {
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const debouncedFn = useMemo(() => {
    return debounce((...args) => {
      fnRef.current(...args)
    }, delay, immediate)
  }, [delay, immediate])

  useEffect(() => {
    return () => {
      if (debouncedFn.cancel) {
        debouncedFn.cancel()
      }
    }
  }, debouncedFn)

  return debouncedFn
}



// 模拟一个类中的方法绑定 this
class Test {
  constructor(name) {
    this.name = name;
    this.log = this.log.bind(this);
    this.debouncedLog = debounce(this.log, 1000, false); // 非立即执行
  }

  log() {
    console.log(`Hello from ${this.name} at ${new Date().toISOString()}`);
  }

  simulateRapidCalls() {
    let count = 0;
    const interval = setInterval(() => {
      this.debouncedLog(); // 每 200ms 调用一次，但只会触发一次
      count++;
      if (count === 5) clearInterval(interval); // 总共调用 5 次
    }, 200);
  }
}

// 执行测试
const t = new Test('ChatGPT');
t.simulateRapidCalls();