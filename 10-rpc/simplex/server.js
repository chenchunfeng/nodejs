const net = require('net');

const app = net.createServer((socket) => {
  socket.on('data', buffer => {
    console.log(buffer.toString());
  })
})

app.listen(4000)