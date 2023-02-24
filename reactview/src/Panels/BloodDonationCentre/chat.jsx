/**
 * Chat Commponent 
 * Further Implementation will perform here
 */
import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3003');

function Chat() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };
  
  socket.on('message', (data) => {
    console.log('Received message:', data);
  });
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
