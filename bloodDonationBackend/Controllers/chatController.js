const { MongoClient } = require('mongodb');

const createMessage = async (req, res) => {
    try {
      const { content, timestamp } = req.body;
  
      // Connect to the MongoDB database
      const client = new MongoClient('mongodb://localhost:27017');
      await client.connect();
      const db = client.db('chatdb');
  
      // Insert the new message into the database
      const result = await db.collection('messages').insertOne({ content, timestamp });
  
      // Emit the new message to connected clients via socket.io
      req.app.get('io').emit('message', result.ops[0]);
  
      client.close();
  
      res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { createMessage };
  
