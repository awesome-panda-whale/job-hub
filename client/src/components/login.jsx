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

    const newUsername = document.getElementById('usernameInput');
    const newPassword = document.getElementById('passwordInput');
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
          username: newUsername.value,
          password: newPassword.value,
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
          <input type='text'id='usernameInput'></input>
          <br></br>
          Password{' '}
          {/* onChange={storePassword} */}
          <input type='password' id='passwordInput'></input>
          <button type='submit' id='loginButton' onClick={loginAccount}>Login!</button>
        </form>
      </div>
      <button onClick={handleClick} id='signup'>Create an Account</button>
    </div>
  );
};

export default Login;
