### common.js规范

由于nodejs没有script标签，无法依次加载其它脚本

于是就有了require  module.exports 一套的全局方法

这边的学习到三个知识点

1. node.js的事件循环也是执行完同步，再执行异步的

```javascript

// lib.js
console.log('lib start')
module.exports.a = 'hello'
console.log('lib end')
setTimeout(() => {
  console.log('lib async')
})

// index.js

console.log('index start')
let lib = require('./lib.js')
lib.a = 'bye bye'
console.log('index end')

// index start
// lib start
// lib end
// index end
// lib async
```
2. require 的返回值就是module.exports的引用

```javascript

// lib.js
module.exports.a = 'hello'
setTimeout(() => {
  console.log('lib', module.exports.a)
})

// index.js
let lib = require('./lib.js')
lib.a = 'bye bye'

// lib bye bey
```

3. exports = module.exports

> 默认是一个对象，引用类型，修改exports其实就是修改module.exports
> 如果exports赋值一个基本类型，这个时间就跟module.exports无关了，不会导出。


```javascript
// 1.lib.js
module.exports.a = 'aaa'
exports.b = 'bbb'

// 1. index.js
let lib = require('./lib.js')
console.log(lib) // {a: 'aaa', b: 'bbb'}


// 2.lib.js
exports.b = 'bbb'
module.exports.a = 'aaa'
exports = '123'
// 2.index.js
let lib = require('./lib.js')
console.log(lib) // {a: 'aaa', b: 'bbb'}
```

### 记下单词

paper
rock
scissors
