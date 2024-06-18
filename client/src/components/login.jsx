import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './style CSS/login.css'
import jobhub from '../assets/jobhub.png'


const Login = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('users/signup');
  };

  async function loginAccount(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // console.log(newUsername.value);
    // console.log(newPassword.value);

    try {
      console.log('before fetch');
      const response = await fetch('http://localhost:3000/users/login', {
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
      console.log('response ', response);
      const data = await response.json();
      if (data) {
        navigate('/users/dashboard');
      }
      console.log(data);
    } catch (err) {
      alert('bad');
    }
    // .then((data) => data.json())
    // .then((data) => {
    //   console.log('this is fetch response', data);
    // })
    // .catch(function (res) {
    //   alert('bad');
    // });
  }

  return (
    <div className='login-container'>
      <div className='jobhub'>
        <img src={jobhub} alt="" />
      </div>
      <h1>Welcome! 🤟</h1>
      <div className='form-container'>
        <form /*onSubmit={handleSubmit}*/ id='loginform'>
          Username{' '}
          {/* onChange={storeUsername} */}
          <input type='text'id='username'></input>
          <br></br>
          Password{' '}
          {/* onChange={storePassword} */}
          <input type='password' id='password'></input>
          <button type='submit' id='loginButton' onClick={loginAccount}>Login!</button>
        </form>
      </div>
      <button onClick={handleClick} id='signup'>Create an Account</button>
    </div>
  );
};

export default Login;
