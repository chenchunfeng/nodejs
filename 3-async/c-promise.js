function interview(round) {
  return new Promise((resolve,reject) => {
    console.log('interview', round) 
    setTimeout(() => {
      if( Math.random() > 0) {
        resolve(round);
      } else {
        reject(round)
      }
    }, 500)
  })
}

// 一家公司的三轮面试
const promise = interview(1).then(round => {
  console.log('smile-', round);
  return interview(2)
}).then(round => {
  console.log('smile-', round);
  return interview(3)
}).then(round => {
  console.log('smile-', round);
  let farther = family('farther')
  let mother = family('mother')
  let uncle = family('uncle')
  // 1.三轮通过后，要问家里人意见，有一个反对就不去  
  // Promise.all([farther, mother, uncle]).then(res => {
  //   console.log('all', res)
  // }).catch(e => {
  //   console.log('arr error', e)
  //   // 如果还想其它人的意见，就查看原来的promise状态
  //   setTimeout(() => {
  //     console.log('farther', farther)
  //     console.log('mother', mother)
  //     console.log('uncle', uncle)
  //   }, 1200)

  // })
  // 2.三轮通过后，要问家里人意见，问过就行，不管他们的意见，退三个promise都改变状态后，都会走then 不管他们的意见
  // Promise.allSettled([farther, mother, uncle]).then(res => {
  //   console.log('allSettled', res)
  // }).catch(e => {
  //   console.log('arr error', e)
  //   // 如果还想其它人的意见，就查看原来的promise状态
  //   setTimeout(() => {
  //     console.log('farther', farther)
  //     console.log('mother', mother)
  //     console.log('uncle', uncle)
  //   }, 1200)
  // })
  // 3.三轮通过后，要问家里人意见，有一个同意就可以了
  // Promise.any([farther, mother, uncle]).then(res => {
  //   console.log('any', res)
  // }).catch(e => {
  //   console.log('arr error', e)
  //   // 如果还想其它人的意见，就查看原来的promise状态
  //   setTimeout(() => {
  //     console.log('farther', farther)
  //     console.log('mother', mother)
  //     console.log('uncle', uncle)
  //   }, 1200)
  // })
  // 4.三轮通过后，要问家里人意见，谁先回答谁说的算
  Promise.race([farther, mother, uncle]).then(res => {
    console.log('race', res)
  }).catch(e => {
    console.log('race error', e)
    // 如果还想其它人的意见，就查看原来的promise状态
    setTimeout(() => {
      console.log('farther', farther)
      console.log('mother', mother)
      console.log('uncle', uncle)
    }, 1200)
  })
}).catch(e => {
  console.log('cry', e)
})

function family(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.8 ? resolve(name) : reject(name)
    }, Math.random() * 1000)

   }) 
}


