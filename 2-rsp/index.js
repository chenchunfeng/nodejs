
let game = require('./core.js');

// 添加电脑输三次不玩了的操作
let count = 0;
// 获取进程的标准输入
process.stdin.on('data', (buffer) => {
  const active = buffer.toString().trim();
  let result = game(active)
  if (result === 1) {
    count++
  } else {
    // 如果想做连输，这里重置count即可
  }
  if (count >= 3) {
    console.log('电脑说，老子不玩不了！')
    process.exit()
  }
})