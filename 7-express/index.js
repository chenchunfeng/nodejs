// // const http = require('http')
// // const fs = require('fs');


// // http.createServer((req, res) => {
// //   // 将其分割成 协议(protocol)://域名(host):端口(port)/路径名(pathname)?请求参数(query)
  
// //   const urlParams = new URL(req.url, 'http://www.baidu.com');
// //   res.writeHead(200)

// //   if (urlParams.pathname === '/favicon.ico') {
// //     res.end()
// //     return;
// //   }

// //   if (urlParams.pathname === '/') {
// //     fs.createReadStream(__dirname + '/index.html').pipe(res);
// //     return;

// //   }

// //   if (urlParams.pathname === '/game') {
// //     const query = urlParams.searchParams;
// //     const playerAction = query.get('action');
// //     let gameResult;
    
// //     if (playerAction === playerLastAction) {
// //       sameCount++;
// //     } else {
// //       sameCount = 0;
// //     }
// //     playerLastAction = playerAction;

// //     if (sameCount >= 3) {
// //       gameResult = 2;
// //     } else {
// //       gameResult = game(playerAction);
       
// //       // 玩家是否连胜判断
// //       if (gameResult === 1) {
// //         if (playerLastWon) {
// //           playerWon++;
// //         }
// //         playerLastWon = true;
// //       } else {
// //         playerWon = 0;
// //         playerLastWon = false;
// //       }

// //       if (playerWon >= 3) {
// //         gameResult = 3;
// //       }
// //     }

  

// //     res.writeHead(tipMap[gameResult].code);
// //     res.end(tipMap[gameResult].text)
// //     return;
// //   }


// // }).listen(3000)


// // 通过路由可以拆分代码,不同的路由走不同的代码块
// // 简化request response api  res.status(xxx) | res.send('xxxx')
const express = require('express')
const fs = require('fs')
const game = require('./core.js');

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

const app = express()
app.get('/', function (req, res) {
  res.status(200);
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
})
app.get('/favicon.ico', function (req, res) {
  res.status(200);
  res.send('Hello')
})

// 逻辑拆分
app.get('/game',
  function (req, res, next) {
    next();
    next();
    res.status(tipMap[res.gameResult].code);
    res.send(tipMap[res.gameResult].text)
  }, 
  function(req, res, next) {
    const playerAction = req.query.action;
    if (playerAction === playerLastAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }
    playerLastAction = playerAction;
  },
  function(req, res, next) {
    if (sameCount >= 3) {
      res.gameResult = 2;
    } else {
      res.gameResult = game(playerLastAction);
      next();
    }
  },
  function(req, res, next) {
      // 玩家是否连胜判断
      if (res.gameResult === 1) {
        if (playerLastWon) {
          playerWon++;
        }
        playerLastWon = true;
      } else {
        playerWon = 0;
        playerLastWon = false;
      }

      if (playerWon >= 3) {
        res.gameResult = 3;
      }
  }
)
 
app.listen(3000)