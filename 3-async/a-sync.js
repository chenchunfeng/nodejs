const glob = require('glob');

console.time('a')
console.log(__dirname)
const result = glob.sync(__dirname + '/**/*')
console.timeEnd('a')
console.log(result.length)

console.time('b')

glob(__dirname + '/**/*', (err, res) => {
  console.log('err', err)
  console.log('res', res.length)
})
console.timeEnd('b')
