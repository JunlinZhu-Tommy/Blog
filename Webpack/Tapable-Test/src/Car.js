const {
  SyncHook,
  SyncBailHook,
} = require('tapable');

module.exports = class Car {
  constructor() {
    this.brakeHook = new SyncBailHook();
    this.startHook = new SyncHook(['Speed']);
  }

  start(speed) {
    this.startHook.call(speed);
  }

  brake() {
    this.brakeHook.call();
  }
}
