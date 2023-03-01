const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
