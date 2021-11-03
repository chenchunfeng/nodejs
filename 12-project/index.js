const fs = require('fs');
const koa = require('koa');
const mount = require('koa-mount')
const static = require('koa-static') 



const serve = new koa();


serve.use(static(__dirname + '/source/'))
serve.use(
  mount('/', async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
  })
)

serve.listen(4000)

