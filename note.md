### 1. common.js规范

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

#### 记下单词

paper
rock
scissors


### 2. npm  node package manager

- npm 是什么 Node.js的包管理工具
- 包是什么 别人写的Node.js模块

遵循commonjs规范，模块化，每一个包是单独一代码包，包里面也可以其它包，然后js的繁荣了起来了。

一些基本指令 安装node.js就会自带npm安装了

- npm init
- npm -v
- npm install xxx
- npm uninstall xxx
- 如果安装慢，可以全局安装cnpm包，使用淘宝镜像
- 也可以使用nrm 切换npm库存地址


### 3. I/O 阻塞 非阻塞


- i/o input output

- 阻塞 非阻塞 可以理解为同步 和异步吗？利用系统时间干其它的事情
 
 阻塞在系统按受输入再到输出的过程中，能不能再接收其它输入

 > 理解非阻塞I/O的要点在于
 - 确定一个进行Input/Output的系统。
 - 思考在I/O过程中，能不能进行其他I/O。

使用callback解决异步问题，但由于回调嵌套层级问题，就有了promise 还有其语法糖 async await

> 问题： 为什么错误要传在回调函数的第一个参数，而不是直接throw

回调函数格式规范: error-firstcallback  异步流程中的执行栈，跟原有的同步的代码不是同一调用栈，所以无法try catch，从而导致全局错误。
```javascript
try {
  setTimeout(function(){
      throw new Error('111')
      console.log('Hey, Why am I last?')
  }, 0)
} catch(e) {
  console.log(e)
}

// 上面代码就无法try catch
```
call stack? event loop? callback queue
举个例子说明
```javascript
// Promise.resolve(1).then(res => {
//   console.log(123);
// })
try {
  setTimeout(function(){
      throw new Error('111')
      console.log('Hey, Why am I last?')
  }, 0)
} catch(e) {
  console.log(e)
}

function sayHi(){
    console.log('Hello')
}

function sayBye(){
    console.log('Goodbye')
}

sayHi()
sayBye()
```

1. js检查是否有语法错误，从上至下检查代码
2. 第一块代码入栈，发现是异步，出栈，该块代码进去callback queue,由于倒计时为零，event loop判断调用栈是否空闲，空闲后执行
3. 遇到两块函数声明，进入memory heap 保存
4. sayHi调用，里面又调用了console.log 调用栈，栈顶入栈，执行完毕出栈 sayHi执行完毕出栈
5. syBye也是一样
6. 调用栈空闲，被event loop发现，调用回调队列里面一个函数推入执行栈。


### 4. event loop

大概的意思就是按一定的间隔去看call stack是否空间，如果空闲就最先进任务队列的任务推入执行栈

代码模拟
```javascript
 class EventLoop {
  constructor() {
    this.TaskQueue = [];
    this.gapTime = 500;
    this.loop();
  }
  add(fun) {
    this.TaskQueue.push(fun)
  }
  loop() {
    // 执行完队列里面的任务才进行下一阶段检查
    while(this.TaskQueue.length) {
      const fun = this.TaskQueue.shift();
      fun();
    }
    setTimeout(this.loop.bind(this), this.gapTime)
  }
}

let loopInstance = new EventLoop();

loopInstance.add(() => {
  console.log('hello')
})
setTimeout(() => {
  loopInstance.add(() => {
    console.log('bye')
  })
}, 200)
setTimeout(() => {
  loopInstance.add(() => {
    console.log('bbq?')
  })
}, 500)
setTimeout(() => {
  loopInstance.add(() => {
    console.log('no')
  })
},1000)
```


### 5. promise

- 状态机 pending 可能转为fulfilled(resolved) 、rejected, 一旦修改无法改变状态

```javascript
  let promise11 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('111'), 1000)
  })
  setTimeout(() => console.log(promise11), 1000)

  let promise22 = new Promise((resolve, reject) => {
    setTimeout(() => reject('111'), 1000)
  })
  setTimeout(() => console.log(promise22), 1000)


  let promise33 = new Promise((resolve, reject) => {
    resolve()
    reject()
  })
  console.log(promise33) // resolve

```
- 内部会吃掉错误，外部无法try catch, 不影响进程？

```javascript
try {
  const promise = new Promise(resolve => {
    resolve(a);
  })
} catch(e) {
  console.log('error', e)
}
setTimeout(() => {
  console.log('hello');
}, 2000)

// hello 照常输出，但是错误无法使用try catch 只能使用.catch
try {
  const promise = new Promise(resolve => {
    resolve(a);
  }).catch(e => {
    console.log('promise catch', e)  // 捕获异常
  }) 
} catch(e) {
  console.log('error', e)
}
setTimeout(() => {
  console.log('hello');
}, 2000)

```

常见方法
1. then   有两个参数 第一个为resolve回调函数 第二个为reject回调函数
```javascript

// promise.then属性微任务   promise 的构造函数是同步的 then的回调函数如果没有返回值，生成新的promise, 国此可以使用链式操作

const promise = Promise.resolve().then(() => {
  // return new Error();               fulfilled
  // throw new Error()                 rejected
  // 无return 则相当 return undefined  fulfilled 
  // return Promise.reject('aaa')      rejected  状态会跟随自己创建的promise
})
console.log(promise)
```
2. catch  其实就是then(null, rejection)的别名
3. all    多个promise数组都成功时才会resolve 有一个失败则reject   发送串行
4. race   最快返回的promise 决定其状态，无论是resolve 或reject
5. allSettled  等待所有promise结果返回 才改变状态，它的回调函数会接收一个数组作为参数，对应前面的每个promise对象
6. any    等待所以返回，全部失败都是reject  有一个resolve就是resolve


### 6. async await 异步终极方案 promise语法糖

async func 返回的就是一个promise对象，他的状态受await 的promise对象影响 或者return 值影响。

- 如果不想某一项await promise的结果影响，就提前把他catch
- try catch 可以捕获await的异常


```javascript
  const noop = () => {}
  const promise = (async function hello() {
    await Promise.resolve(1)
    // await Promise.reject().catch(noop)
    // try {
    //   await Promise.reject()
    // } catch(e){}
    // throw new Error()
    // await Promise.reject()
    // return Promise.resolve('hi')

    // await 的返回值又是什么呢
    console.log('test', await Promise.resolve(2))
    return Promise.resolve(3)
  })()

  console.log(promise) // promise
  setTimeout(() => {
    console.log(promise)
  }, 1000)


try {
  setTimeout(() => {
    throw new Error()
  })
} catch(e) {
  console.log(e)console.log(e)
}

```
### 7. http

创建简单http 服务

```javascript

const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200)
  response.end('hello')
}).listen(3000);
```

### 8. express

Features
- Robust routing   强健的路由
- Focus on high performance  关注高性能
- Super-high test coverage   高测试覆盖率
- HTTP helpers (redirection, caching, etc)  http服务助手
- View system supporting 14+ template engines  支持14+模板引擎
- Content negotiation          内容处理
- Executable for generating applications quickly 快速创建可执行的应用程序?


中间件 
- next 更好的分割组织流程代码
- 洋葱模型
- 不能使用异步

### 9. koa

- 中间件有了暂停的能力，async await
- 路由功能，精减 需要自行安装koa-mount  根路由要放在最下面
- 回调的request response 都挂在context上面，这样子就不需要把一个参数挂在response上了
- res.status .send方法 都改为了赋值运算 ctx.status = xxx ctx.body = xxxx;
- 

koa vs express

- express 门槛更低  koa更强大优雅
- express 封装更多东西，开发更快速   koa可定制型更高

### 10. rpc  remote procedure call  远程程序调用

与ajax的相同点
- 都是计算机之间的网络通信
- 都需要约定数据格式
不同点
- 不一定使用dns作为寻址服务
- 应用层协议一般不使用http
- 基于tcp udp协议
  
ajax 寻址 负载均衡

- client 浏览器，使用域名向dns server换ip 地址
- 浏览器再通过ip地址访问服务器

rpc
- client node.js 向 LB server服务器换ip，没有域名的概念， 有特定的标识VIP LD
- 

TCP通信方式

单工 半双工 全双工

### 11 node.js buffer

javaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

protocol-buffers 比json xml 更高效直观储存数据

### 12 es6 template engines

```javascript
  const user = {
    name: 'Mr.chen',
    age: '45'
  }
  const template = '`<div>${user.name}</div>`'


  function render() {
    document.body.append(template)
  }
```

### 32 graphQL

这东西感觉还是太麻烦了，通过前端query={xxxx{xxxx,xxxx}}

```javascript
  fetch('./api?query={comment{id,avatar,name,isTop,content,publishDate,commentNum,praiseNum}}')

  fetch("./api", {
  method: "POST",
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    "query": "mutation { praise(id: " + $bindtarget.getAttribute("data-id") + ") }"
  })
})
// schema
const schema = buildSchema(`
    type Comment {
        id: Int
        avatar: String
        name: String
        isTop: Boolean
        content: String
        publishDate: String
        commentNum: Int
        praiseNum: Int
    }
    type Query {
        comment: [Comment]
    }
    type Mutation {
        praise(id: Int): Int
    }
`)

schema.getQueryType().getFields().comment.resolve = () => {
    return Object.keys(mockDatabase).map(key=> {
        return mockDatabase[key];
    })
}
schema.getMutationType().getFields().praise.resolve = (args0, { id }) => {
    mockDatabase[id].praiseNum++;

    return mockDatabase[id].praiseNum
}

module.exports = schema;

```

### 35 react渲染demo
### 36 前后端同构

需求
- 后端需要渲染列表
  - 首屏加速
  - SEO
- 前端也会有排序，刷新等操作
  
这个时间就需要采用同构的方法
- 同一个模板/组件,可以在服务端（node.js）渲染也可以在浏览器渲染。

<strong>核心</strong>

- ReactDomServer.renderToString()
- VueServerRenderer.renderToString()

  
> React/Vue同构的最大难题其实是数据部分
> 同构的关键-注重职责的分离



