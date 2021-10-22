// 回调其实一种异步调用的解决方案

function interview(callback) {
  console.log('interview') 
  setTimeout(() => {
    if( Math.random() > 0.5) {
      callback(null, 'success')
    } else {
      // throw new Error('fail')
      // callback(new Error('fail'),'fail')
    }
  }, 200)
}

// interview(console.log)

// 异步串行任务，就要嵌套了，这里就是所谓的回调地狱 callback hell   回调里面写回调
// 回调函数的第一个参数留error nodejs规范
// try {
  interview((err, res) => {
    if (err) {
      console.log('cry at 1')
      return;
    }
    interview((err, res) => {
      if (err) {
        console.log('cry at 2')
        return;
      }
      interview((err, res) => {
        if (err) {
          console.log('cry at 3')
          return; 
        } else {
          console.log('smile')
        }
      })
    })
  })
// } catch (error) {
//   // console.log('err', error)
// }
