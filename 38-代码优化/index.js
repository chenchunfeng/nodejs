const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');

const app = new koa();

app.use(
    static(__dirname + '/source/')
);

// const INDEX = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
const INDEX = fs.readFileSync(__dirname + '/source/index.htm')
app.use(
    mount('/', async (ctx) => {
        // ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
        // 1. 不需要每次请求都使用函数加载
        ctx.status = 200;
        ctx.type = "html";
        ctx.body = INDEX;
    })
);


app.listen(3000);