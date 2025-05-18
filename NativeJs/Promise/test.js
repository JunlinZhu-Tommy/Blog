var MyPromise = require('./my-promise');

var promise1 = new MyPromise((resolve) => {
  window.setTimeout(
    () => {
      resolve('request1 success');
    }, 500,
  )
});

promise1.then(function(value) {
  console.log(value);
});

var promise2 = new MyPromise((resolve, reject) => {
  window.setTimeout(
    () => {
      resolve('request2 success');
    }, 500,
  )
});

promise2.then(function(value) {
  console.log(value);
}, function(reason) {
  console.log(reason);
});
