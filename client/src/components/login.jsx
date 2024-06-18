import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleCSS/login.css';
import jobhub from '../assets/jobhub.png';

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginAccount = async (event) => {
    event.preventDefault();

    try {
      console.log("Attempting to log in with:", username, password);

      const response = await fetch('http://localhost:3000/login', { // Ensure this is the correct endpoint
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // if (data) {
        //   navigate('/dashboard');
        // }
      } else {
        console.error('Failed to login, status:', response.status);
      }
    } catch (err) {
      console.error('Error during fetch:', err);
      alert('bad');
    }
  }

  return (
    <div className='login-container'>
      <div className='jobhub'>
        <img src={jobhub} alt="" />
      </div>
      <h1>Welcome! 🤟</h1>
      <div className='form-container'>
        <form id='loginform' onSubmit={loginAccount}>
          <input 
            type='text' 
            value={username} 
            onChange={(uv) => setUsername(uv.target.value)} 
            placeholder='Username'
          />
          <input 
            type='password' 
            value={password} 
            onChange={(pv) => setPassword(pv.target.value)} 
            placeholder='Password'
          />
          <button type='submit' id='loginButton'>Login!</button>
        </form>
      </div>
      <button onClick={() => navigate('/signup')} id='signup'>Create an Account</button>
    </div>
  );
};

export default Login;
