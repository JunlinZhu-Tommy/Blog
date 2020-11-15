const Car = require('./Car');

const car = new Car();

// Base Case
car.startHook.tap('StartPlugIn', () => {
  console.log('启动')
})

// 像Plugin传递参数
car.startHook.tap('startPluginWithPara', (speed) => {
  console.log('Start Speed', speed)
});
car.start(100);

// SyncBailHook
car.brakeHook.tap('brakePlugin2', () => {
  console.log('brake1');
})
car.brakeHook.tap('brakePlugin2', () => {
  console.log('brake2');
})
car.brakeHook.tap('brakePlugin3', () => {
  console.log('brake3');
})

// brake1, brake2, brake3

// SyncBailHook Break
car.brakeHook.tap('brakePlugin2', () => {
  console.log('brake1');
})
car.brakeHook.tap('brakePlugin2', () => {
  console.log('brake2');
  return 1;
})
car.brakeHook.tap('brakePlugin2', () => {
  console.log('brake2');
})
// brake1, brake2

car.brake();