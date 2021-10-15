let emitter = require('events').EventEmitter;

class Lesson extends emitter {
  constructor() {
    super()

    // setInterval(() => {
    //   this.publishLesson()
    // }, 1000);
    setTimeout(() => {
      this.publishLesson()
    }, 1000);
  }
  publishLesson() {
    this.emit('newLesson', {
      price: Math.random() * 100
    })
  }
}

module.exports = new Lesson();