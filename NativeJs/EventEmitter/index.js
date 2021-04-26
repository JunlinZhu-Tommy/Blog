// var simpleEventEmitter = {
//   subscribers: {
//     any: [],
//   },

//   subscribe: function (type, fn) {
//     if (!this.subscribers[type]) {
//       this.subscribers[type] = [];
//     }

//     this.subscribers[type].push(fn);
//   },

//   unsubscribe: function (type, fn) {
//     this.subscribers[type] = this.subscribers[type].filter(function (item) {
//       return item !== fn;
//     });
//   },

//   publish: function (type, ...args) {
//     this.subscribers[type].forEach(function (item) {
//       item(...args);
//     });
//   },
// };

// const tom = {
//   readNews: function (info) {
//     console.log(info);
//   },
// };

function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (
  type,
  listener,
  flag
) {
  if (!this._events) this._events = Object.create();

  if (this._events[type]) {
    if (flag) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
};

EventEmitter.prototype.emit = function (type, ...args) {
  if (this._events[type]) {
    this._events[type].forEach((fn) => fn.call(this, ...args));
  }
};

EventEmitter.prototype.once = function (type, listener) {
  let _self = this;

  function only() {
    listener();
    _self.removeListener(type, only);
  }

  only.origin = listener;

  this.on(type, only);
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener = function (
  type,
  listener
) {
  if (this._events[type]) {
    this._events[type] = this._events[type].filter(function (item) {
      return item !== listener && item.origin !== listener;
    });
  }
};

EventEmitter.prototype.prependListener = function (type, listener) {
  this.on(type, listener, true);
};

EventEmitter.defaultMaxListeners = 10;

const eventTest = new EventEmitter();

eventTest.on("muse", tom.readNews);
eventTest.on("sport", tom.readNews);

eventTest.emit("muse", "S.H.E演唱会惊喜登台");
eventTest.emit("sport", "欧国联-意大利0-1客负葡萄牙");
