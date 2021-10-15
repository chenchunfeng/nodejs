const lesson = require('./lesson');
lesson.on('newLesson', ({price}) => {
  console.log('yeah! new lesson')
  if (price < 80) {
      console.log('buy')
  }
})

setTimeout(() => {
  // 需要注意的是，EventEmitter如果添加了过多的监听器，Node.js觉得你有内存泄漏嫌疑，会抛出一个warning。
  // 用以下这句则可以消除这个限制
  // lesson.setMaxListeners(200);
  for (let i = 0; i < 2; i++) {
    lesson.on('newLesson', ({ price }) => {
      console.log('yeah! new lesson')
      })
  }
}, 100)