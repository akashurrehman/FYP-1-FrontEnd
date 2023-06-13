import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3033');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState('12122');

  useEffect(() => {
    // Join a room with the user's ID when they connect
    socket.emit('join', currentUserId);

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);

  // Listen for new messages from the server
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = () => {
    const newMessage = {
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    // Emit the new message to the server with the recipient's user ID
    socket.emit('message', { userId: '11255445', message: newMessage });

    setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the message to the sender's message list

    setInputMessage('');
  };

  return (
    <div>
      <h1>Chat System</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.content}</span>
            <span>{message.timestamp}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
