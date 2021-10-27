const http = require('http')
const fs = require('fs');
const game = require('./core.js');


let playerLastAction = null;
let playerLastWon = true;
let playerWon = 0;
let sameCount = 0;
const tipMap = {
  '0' : { text: '平局', code: 200},
  '-1' : { text: '你输了', code: 200},
  '1' : { text: '你赢了又怎样', code: 200},
  '2' : { text: '你当我傻吗，不玩了', code: 400},
  '3' : { text: '你在作弊，没法玩了', code: 500},
}

http.createServer((req, res) => {
  // 将其分割成 协议(protocol)://域名(host):端口(port)/路径名(pathname)?请求参数(query)
  
  const urlParams = new URL(req.url, 'http://www.baidu.com');
  res.writeHead(200)

  if (urlParams.pathname === '/favicon.ico') {
    res.end()
    return;
  }

  if (urlParams.pathname === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
    return;

  }

  if (urlParams.pathname === '/game') {
    const query = urlParams.searchParams;
    const playerAction = query.get('action');
    let gameResult;
    
    if (playerAction === playerLastAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }
    playerLastAction = playerAction;

    if (sameCount >= 3) {
      gameResult = 2;
    } else {
      gameResult = game(playerAction);
       
      // 玩家是否连胜判断
      if (gameResult === 1) {
        if (playerLastWon) {
          playerWon++;
        }
        playerLastWon = true;
      } else {
        playerWon = 0;
        playerLastWon = false;
      }

      if (playerWon >= 3) {
        gameResult = 3;
      }
    }

  

    res.writeHead(tipMap[gameResult].code);
    res.end(tipMap[gameResult].text)
    return;
  }


}).listen(3000)