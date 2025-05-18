function fetchUser() {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id: 1, name: "Alice" }), 1000)
  );
}

function fetchOrders(userId) {
  return new Promise(resolve =>
    setTimeout(() => resolve([`Order for user ${userId}`]), 1000)
  );
}

function *myTask() {
  const user = yield fetchUser()
  console.log('User: ', user)

  const orders = yield fetchOrders(user.id)
  console.log('Orders": ', orders)

  return orders
}

run(myTask).then(res => {
  console.log(console.log('Done'))
})

function run(generatorFunc) {
  const gen = generatorFunc()

  return new Promise((resolve, reject) => {
    function step(nextF, arg) {
      let result

      try {
        result = nextF(arg)
      } catch (error) {
        return reject(error)
      }

      if (result.done) {
        return resolve(result.value)
      }

      Promise.resolve(result.value).then(
        val => step(gen.next.bind(gen), val),
        err => step(gen.throw.bind(gen), err)
      )
    }

    step(gen.next.bind(gen))
  })
}