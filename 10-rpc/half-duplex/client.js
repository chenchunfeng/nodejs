const net = require('net');


const socket = new net.Socket({})


socket.connect({
  host: '127.0.0.1',
  port: 4000
})

socket.write('bbq');

socket.on('data', (buffer) => {
  console.log(buffer.toString());
  socket.write((Math.random() * 10).toString())
})