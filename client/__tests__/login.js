import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../src/components/login.jsx'

describe('Unit testing Login components', () => {

  let text  

  beforeEach(async () => {
    text = render(
      <Router>   
        <Routes>
          
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    )
  })

  test('Rending input field for username and password', async () => {
    const username = text.container.querySelector('#username');
    const password = text.container.querySelector('#password');
    expect(username.name).toEqual('username')
    expect(password.name).toEqual('password')
  })

  test('should have a button for login', async () => {
    const login = await text.getByText('Login')
    expect(login.tagName).toBe('BUTTON')
  })

  test('Getting the value when the login button pressed', async () => {
    fireEvent.change(text.container.querySelector('#username'), { target: { value: 'hello' } });
    fireEvent.change(text.container.querySelector('#password'), { target: { value: '123' } });
    expect(text.container.querySelector('#username').value).toEqual('hello')
    expect(text.container.querySelector('#password').value).toEqual('123')

  })
})