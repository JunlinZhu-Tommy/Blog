const Car = require('./Car');

const car = new Car();

// SyncHook
// car.startHook.tap('StartPlugIn', () => {
//   console.log('启动')
// })

// 
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

car.accelerateHook.tap('acceleratePlugin1', (speed1) => {
  console.log(speed1);

  return speed1 + 50;
});

car.accelerateHook.tap('acceleratePlugin2', (speed2) => {
  console.log(speed2);

  return speed2 + 50;
});

car.accelerateHook.tap('acceleratePlugin3', (speed3) => {
  console.log(speed3);

  return speed3;
});

car.accelerateHook.call(50);

let index = 0;

car.loopStartHook.tap('startPlugin1', () => {
  if (index < 5) {
    console.log(`启动`);

    index++;
    return 1;
  }
});

car.loopStartHook.tap('startPlugin2', () => {
  console.log(`启动成功`);
});

car.loopStart();