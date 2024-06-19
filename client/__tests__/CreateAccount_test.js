import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/login'
import Signup from '../src/components/signup'; // Import your SignUp component

test('User can successfully create an account', async () => {
    render(
    <Router>   
        <Routes>
            <Route path="/users/signup" element={<Signup />} />
        </Routes>
    </Router>

);

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'firstname' } });
    fireEvent.change(screen.getByPlaceholderText('Lastname'), { target: { value: 'lastname' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });

    console.log(fireEvent.click(screen.getByText('Sign Up')))
    // Submit the form
    fireEvent.click(screen.getByText('Sign Up'));
    
    // // Check for the success message
    const successMessage = await screen.findByText('Successfully Created Account');
    expect(successMessage).toBeInTheDocument();
    // Check if rendered to next page
    // expect('/')
});