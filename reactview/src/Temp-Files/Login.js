import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/login', {
            username,
            password
          });
          const token = response.headers.authorization;
            // Store the token in local storage

          localStorage.setItem('token', token);
          console.log("Before Decode Token:",token);
          // Determine the user's role from the token payload
          const { role } = jwt_decode(token);
          console.log("After Decode Token:",jwt_decode(token))
          console.log("Role:",role);
          // Redirect the user to the appropriate route based on their role
          /*
          switch (role) {
            case 'public':
              //history.push('/public');
              break;
            case 'admin':
              //history.push('/admin');
              break;
            case 'blood center':
              //history.push('/blood-center');
              break;
            default:
              //history.push('/');
          }
          */
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log('An error occurred');
          }
        }
      }
    return (
      <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
    );
}

export default Login;