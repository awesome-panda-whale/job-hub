import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import {  BrowserRouter as Router, Route, Routes, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../src/components/login.jsx';
import { AuthContext } from "../src/Contexts/AuthContext";


// Frontend Test: User Successful Login

describe('Unit testing Login components', () => {

  beforeEach(() => {

    global.fetch = jest.fn();

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{login: jest.fn()}} >
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>     
    )
  })

  test('Rending input field for username and password', async () => {
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login!')).toBeInTheDocument();
  })

  test('Should button rendered', async () => {
    const login = await screen.getByText('Login!')
    expect(login.tagName).toBe('BUTTON')
  })

  test('Submit the form with username and password', async () => {
    // Received Input
    const mockLogin = jest.fn();
    
    global.fetch = mockLogin.mockResolvedValueOnce({
      ok: true,
      // json: async () => ({
      //   success: true,
      //   data: { userId: "1", username: "testuser" },
      // }),
      json: () => Promise.resolve({
        success: true,
        data: {
          userId: 1,
          username: "testuser",
          password: "12345", 
        }
      })
    });
   
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12345' } });
    // expect(screen.getByPlaceholderText('Username').value).toEqual('testuser')
    // expect(screen.getByPlaceholderText('Password').value).toEqual('12345')
    fireEvent.click(screen.getByText('Login!'));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("http://localhost:3000/users/login", {"body": "{\"username\":\"testuser\",\"password\":\"12345\"}", "headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "POST"});
      // expect(global.fetch).toHaveBeenCalledWith("tesetuser", "1");
    })
  
  })
  
})