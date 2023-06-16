import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth  }  from './Auth/AuthContext';
import jwt_decode from 'jwt-decode';
import './Styling/chat.css'; 

const socket = io('http://localhost:3003');

function Chat() {

  const { token } = useAuth();

  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const Id = decodedToken?.id;

  const [SenderId, setSenderId] = useState('');
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('12Random'); // Hardcoded receiver ID, replace with actual ID
  const [receivedMessage, setReceivedMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    // set the User ID
    setSenderId(Id);
    setReceiverId('12Random');
    console.log("Login ID:",Id);

    // Join the room with the user ID when connected
    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('join', SenderId);
    });

    // Listen for incoming messages
    socket.on('message', (msg) => {
      setReceivedMessage(msg);
    });
  }, [SenderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (SenderId && receiverId && message) {
      const newMessage = { SenderId, receiverId, message };
      socket.emit('message', newMessage);
      setSentMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("sent Messages are:", sentMessages);
      setMessage('');
    }
  };
  

  return (
    <div className="chat-container">
        <h1 className="chat-heading">Chat</h1>
        <div className="chat-window">
        <div className="message-list">
        {sentMessages.map((msg, index) => (
          <div key={index} className="message">
            <span className="sender">You:</span>
            <span className="message-content">{msg.message}</span>
          </div>
        ))}
        </div>
      <div className="input-area">
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
      </div>
      <div className="received-message">
        <h2 className="received-message-heading">Received Message:</h2>
        <p className="received-message-content">{receivedMessage}</p>
      </div>
    </div>
  );
}

export default Chat;
