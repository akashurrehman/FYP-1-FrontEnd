// Import required modules
const socketIO = require('socket.io');
const Message=require('../Model/messageSchema');

// Export a function that attaches the chat server to the provided HTTP server
module.exports.attach = function (server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a room when a user connects
  socket.on('join', (SenderId) => {
    socket.join(SenderId);
    console.log('Joined room:', SenderId);
  });

  // Listen for new messages from clients
  socket.on('message', (data) => {
    const { SenderId,receiverId, message } = data;

    console.log('Message received', data);

    // Emit the message to the recipient in their room
    socket.to(receiverId).emit('message', message);
    console.log('Message sent By:', SenderId);
    console.log('Message sent to:', receiverId);
    console.log('Message:', message);

    //Save the message in database
    var newMessage = new Message({
        "senderID" : SenderId,
        "receiverID" : receiverId,
        "message" : message,
        });
        newMessage.save(function(err, result) {
        if (err)
        console.log(err);
          console.log("Message Saved");
        });

    // Auto-reply with a response message
    const responseMsg = 'Auto reply: Your message has been received.';
    socket.emit('message', responseMsg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
};
