import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button,Modal } from 'react-bootstrap';

const OpenApi = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3003/chatgpt/chatgpt', { prompt: input });
      setResponse(result.data.text);
      console.log("Inputed Prompt:"+input);
    } catch (error) {
      console.error(error);
      console.log("Inputed Prompt:"+input);
      setResponse('An error occurred while processing your request.');
    }
  };

  return (
    <Modal>
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="input">
          <Form.Label>Input:</Form.Label>
          <Form.Control
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
    </Modal>
  );
};

export default OpenApi;
