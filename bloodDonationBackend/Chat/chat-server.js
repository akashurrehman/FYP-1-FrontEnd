// Import required modules
const socketIO = require('socket.io');
const Message = require('../Model/messageSchema');

// Export a function that attaches the chat server to the provided HTTP server
module.exports.attach = function (server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a room when a user connects
    socket.on('join', (senderID) => {
        socket.join(senderID);
        console.log('Joined room:', senderID);
    
        // Fetch the conversation history for the user
        Message.find({ $or: [{ senderID: senderID }, { receiverID: senderID }] }, (err, messages) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Fetched conversation history:', messages);
            // Emit the conversation history to the user
            socket.emit('conversationHistory', messages);
        }
        });
    });
  

   socket.on('message',async (data) => {
        const { senderID, receiverID, message } = data;
      
        console.log('Message received', data);
      
        // Emit the complete message object to the recipient in their room
        const newMessage = new Message({
          senderID: senderID,
          receiverID: receiverID,
          message: message,
        });
      
        newMessage.save((err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Message saved:', result);
      
            // Emit the message object to the recipient in their room
            io.to(receiverID).emit('message', newMessage);
            console.log('Message sent By:', senderID);
            console.log('Message sent to:', receiverID);
            console.log('Message:', message);
          }
        });
      });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
