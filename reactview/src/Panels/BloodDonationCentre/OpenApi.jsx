import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Input:</label>
        <input
          type="text"
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default OpenApi;