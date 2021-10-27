const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  console.log(req.url)
  res.writeHead(200);

  if (req.url == '/favicon.ico') {
    res.end();
    return;
  }

  fs.createReadStream(__dirname + '/index.html')
  .pipe(res);
  // res.writeHead(200);
  // res.end('test');
  
}).listen(3000)