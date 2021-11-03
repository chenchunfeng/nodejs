const net = require('net');

const app = net.createServer(socket => {
  socket.on('data', (buffer) => {
    console.log(buffer.toString());
    setTimeout(() => {{
      socket.write('yes');
    }})
  })
});

socket.on('error', (err) => {
  console.log(err);
});

app.listen(4000)