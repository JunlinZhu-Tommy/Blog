const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
} = require('tapable');

module.exports = class Car {
  constructor() {
    this.brakeHook = new SyncBailHook();
    this.accelerateHook = new SyncWaterfallHook(['Speed']);
    this.startHook = new SyncHook(['Speed']);
    this.loopStartHook = new SyncLoopHook();
  }

  start(speed) {
    this.startHook.call(speed);
  }

  brake() {
    this.brakeHook.call();
  }

  accelerate() {
    this.accelerateHook.call();
  }

  loopStart() {
    this.loopStartHook.call();
  }
}
