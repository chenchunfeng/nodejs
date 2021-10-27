function interview(round) {
  return new Promise((resolve,reject) => {
    console.log('interview', round) 
    setTimeout(() => {
      if( Math.random() > 0.2) {
        resolve(round);
      } else {
        reject(round)
      }
    }, 500)
  })
}

(async function() {
  let one, two, three;
  try {
    await interview(1).catch(e => console.log(`第${e}轮，不成功`));
    await interview(2).catch(e => console.log(`第${e}轮，不成功`));
    await interview(3).catch(e => console.log(`第${e}轮，不成功`));
    console.log('三轮都成功')
  } catch(e) {
    // console.log(`aaa第${e}轮，不成功`);
    // console.log('one', one)
    // console.log('two', two)
    // console.log('three', three)
  }




})()

function family(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.8 ? resolve(name) : reject(name)
    }, Math.random() * 1000)

   }) 
}


