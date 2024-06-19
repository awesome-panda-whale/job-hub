import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleCSS/signup.css'
import jobhub from '../assets/jobhub.png'

const Signup = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // setSuccessMessage('')

  function createAccount() {
    setError('')
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;

    // console.log(newUsername.value);
    // console.log(newPassword.value);
    // console.log(newFirstname.value);
    // console.log(newLastname.value);

    //check edge case for input
    const input = [username, password, firstname, lastname, email]
    for(let i = 0; i < input.length; i++){
      if(!input[i] || input[i].trim() === '') 
        return setError('Please fill up all the fields')
    }

    fetch('http://localhost:3000/users/signup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        firstName: firstname,
        lastName: lastname,
        email: email
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('signup data', data);
        setSuccessMessage('Successfully Created Account');
        navigate('/');
      })
      .catch(error => {
        setError('Error on signing up');
        console.log(error)
      });
  }

  return (
    <div className='signup-box'>
      <div className='jobhub'>
        <img src={jobhub} alt="" />
      </div>
      <h1>Welcome! 🤟</h1>
      <div className='container'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' placeholder='Username' />
        <label htmlFor="password">Password</label>
        <input type='password' id='password' name='password' placeholder='Password' />
        <label htmlFor="firstname">Firstname</label>
        <input type='text' id='firstname' name='firstname' placeholder='Firstname' />
        <label htmlFor="lastname">Lastname</label>
        <input type='text' id='lastname' name='lastname' placeholder='Lastname' />
        <label htmlFor="email">Email</label>
        <input type='email' id='email' name='email' placeholder='Email' />
        {error && <div className='error'>{error}</div>}
        <button type='button' onClick={createAccount}>Sign Up</button>
        {successMessage && <div>{successMessage}</div>}
      </div>
      <button onClick={handleClick} id='signup'>Already have an account?</button>
    </div>
  );
};

export default Signup;
