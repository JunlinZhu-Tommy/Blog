var PENDING_STATUS = "pending";
var FULFILLED_STATUS = "fulfilled";
var REJECTED_STATUS = "rejected";

function MyPromise(executor) {
  this.status = PENDING_STATUS;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  var that = this;

  function resolve(value) {
    if (that.status === PENDING_STATUS) {
      that.status = FULFILLED_STATUS;
      that.value = value;

      that.onFulfilledCallbacks.forEach((callback) => {
        callback();
      });
    }
  }

  function reject(reason) {
    if (that.status === PENDING_STATUS) {
      that.status = REJECTED_STATUS;
      that.reason = reason;

      that.onRejectedCallbacks.forEach((callback) => {
        callback();
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var realOnFulfilled = onFulfilled;

  if (typeof realOnFulfilled !== "function") {
    realOnFulfilled = function (value) {
      return value;
    };
  }

  var realOnRejected = onRejected;
  if (typeof realOnRejected !== "function") {
    realOnRejected = function (reason) {
      throw reason;
    };
  }

  var that = this;

  if (this.status === FULFILLED_STATUS) {
    var promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onFulfilled !== "function") {
            resolve(that.value);
          } else {
            var x = realOnFulfilled(that.value);

            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
    realOnFulfilled(this.value);
  }

  if (this.status === REJECTED_STATUS) {
    var promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onRejected !== "function") {
            reject(that.reason);
          } else {
            const x = onRejected(that.reason);

            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  if (this.status === PENDING_STATUS) {
    var promise2 = new MyPromise(function (resolve, reject) {
      this.onFulfilledCallbacks.push(
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(that.value);
            } else {
              var x = realOnFulfilled(that.value);

              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        })
      );

      this.onRejectedCallbacks(
        setTimeout(() => {
          try {
            if (typeof onRejected !== "function") {
              reject(that.reason);
            } else {
              const x = onRejected(that.reason);

              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        })
      );
    });
  }
};

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(
      new TypeError(
        'The promise and the return value are the same'
      )
    )
  }

  if (x instanceof MyPromise) {
    x.then((y) => {
      resolvePromise(promise, y, resolve, reject)
    }, reject)
  }

  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      resolve(x)
    }

    try {
      var then = x.then
    } catch (error) {
      return reject(error)
    }

    if (typeof then === 'function') {
      var called = false

      try {
        then.call(
          x,
          function(y) {
            if (called) return
            called = true
            resolvePromise(
              promise, y, resolve, reject,
            )
          },
          function(r) {
            if (called) return
            call = true
            reject(r)
          },
        )
      } catch (error) {
        if (called) return
        reject(error)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}
var promise1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve("request1 success");
  }, 500);
});

promise1.then(function (value) {
  console.log("Promise 1 Value");
  console.log(value);
});

var promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("request2 success");
  }, 500);
});

promise2.then(
  function (value) {
    console.log("Promise 2 Value");
    console.log(value);
  },
  function (reason) {
    console.log(reason);
  }
);
