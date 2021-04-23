Promise.prototype.myAll = function (arr) {
  return new Promise(function (resolve, reject) {
    let finish = 0;
    let results = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Promise) {
        arr[i].then(
          (val) => {
            finish++;
            results.push(val);

            if (finish === arr.length) {
              resolve(results);
              return;
            }
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        results[i] = arr[i];
        finish++;

        if (finish === arr.length) {
          resolve(results);
        }
      }
    }
  });
};

Promise.prototype
  .myAll([
    new Promise((resolve) => {
      setTimeout(() => resolve(1), 1000);
    }),
    new Promise((resolve) => {
      setTimeout(() => resolve(1), 1000);
    }),
    new Promise((resolve) => {
      setTimeout(() => resolve(1), 1000);
    }),
  ])
  .then((results) => console.log(results));
