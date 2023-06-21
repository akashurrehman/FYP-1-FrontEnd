import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth  }  from './Auth/AuthContext';
import jwt_decode from 'jwt-decode';
import './Styling/chat.css'; 
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:3003');

function Chat() {

  const { token } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  
  const [senderID, setSenderId] = useState('');
  const [message, setMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const [receiverID, setReceiverId] = useState('AD001'); // Hardcoded receiver ID, replace with actual ID
  const [receivedMessage, setReceivedMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    // set the User ID
    setSenderId(id);
    setReceiverId('AD001');
    console.log("Login ID:",id);

    // Join the room with the user ID when connected
    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('join', senderID);
    });

    socket.on('message', async (msg) => {
      console.log('Received message:', msg);
      await setReceivedMessage(msg);
      console.log('Received messages', receivedMessage);
    });
  }, [senderID,receivedMessage]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (senderID && receiverID && message) {
      const newMessage = { senderID, receiverID, message };
      socket.emit('message', newMessage);
      setSentMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log('Sent Messages are:', sentMessages);
      setMessage('');
    }
    if (senderID && receiverID && replyMessage) {
      const reply = { SenderId: receiverID, receiverID: senderID, message: replyMessage };
      socket.emit('message', reply);
      setSentMessages((prevMessages) => [...prevMessages, reply]);
      console.log('Sent Reply Messages are:', sentMessages);
      setReplyMessage('');
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
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <label htmlFor="replyMessage">Reply:</label>
            <input
              type="text"
              id="replyMessage"
              className="message-input"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
            <button type="submit" className="send-button">
              Reply
            </button>
          </form>
          </div>
        </div>
      <div className="received-message">
        <h2 className="received-message-heading">Received Message:</h2>
        <div className="received-message-content">
          {receivedMessage && (
            <div className="message">
              <span className="message-content">{receivedMessage.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
