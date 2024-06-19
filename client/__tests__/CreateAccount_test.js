import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Signup from '../src/components/signup'; // Import your SignUp component

test('User can successfully create an account', async () => {
    render(<Signup />);

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText('Create Account'));

    // Check for the success message
    const successMessage = await screen.findByText('Account successfully created');
    expect(successMessage).toBeInTheDocument();
});