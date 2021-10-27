
const koa = require('koa')
const fs = require('fs')
const game = require('./core.js');
const mount = require('koa-mount')

let playerLastAction = null;
let playerLastWon = true;
let playerWon = 0;
let sameCount = 0;
const tipMap = {
  '0' : { text: '平局', code: 200},
  '-1' : { text: '你输了', code: 200},
  '1' : { text: '你赢了', code: 200},
  '2' : { text: '你再试试出一样？', code: 400},
  '3' : { text: '你在作弊，没法玩了', code: 500},
}

const app = new koa()



app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200;
    ctx.body = 'Hello';
  })
)

// 逻辑拆分
const gameKoa = new koa();
app.use(
    mount('/game', gameKoa)
)
gameKoa.use(async (ctx, next) => {
  console.log('1a')
  await next();
  ctx.status = tipMap[ctx.gameResult].code
  ctx.body = tipMap[ctx.gameResult].text
  console.log('1b')

})

gameKoa.use(async (ctx, next) => {
  console.log('2a')

  const playerAction = ctx.query.action;
  if (playerAction === playerLastAction) {
    sameCount++;
  } else {
    sameCount = 0;
  }
  playerLastAction = playerAction;
  await next()
  console.log('2b')

})

gameKoa.use(async (ctx, next) => {
  console.log('3a')

  if (sameCount >= 3) {
    ctx.gameResult = 2;
  } else {
    ctx.gameResult = game(playerLastAction);
    await next();
    console.log('3b')

  }
})

gameKoa.use(async (ctx, next) => {
  console.log('4a')
  await new Promise( resolve => {setTimeout(() => {
      // 玩家是否连胜判断
      if (ctx.gameResult === 1) {
        if (playerLastWon) {
          playerWon++;
        }
        playerLastWon = true;
      } else {
        playerWon = 0;
        playerLastWon = false;
      }

      if (playerWon >= 3) {
        ctx.gameResult = 3;
      }
      resolve()
      console.log('4b')
  }, 2000)})


})

app.use(
  mount('/', function (ctx) {
    ctx.status = 200;
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  })
)
 
app.listen(3000)