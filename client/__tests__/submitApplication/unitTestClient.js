import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import Dashboard from '../../src/components/dashboard';
import '@testing-library/jest-dom';

describe('Submit Form Testing', () => {
    it('submit form and invokes POST request with correct data', async() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                "success": true,
                "message": "Saving Application",
                "data": {
                    "company": "Apple",
                    "position": "SDE"
                }
            })
        });

        render(<Dashboard />);

        const inputCompany = screen.getByLabelText('Company Name');
        const inputPosition = screen.getByLabelText('Position');
        const inputUrl = screen.getByLabelText('URL');
        const inputDateApplied = screen.getByLabelText('Date Applied');
        const inputStatusId = screen.getByLabelText('Status');
        const inputContact = screen.getByLabelText('Contact');
        const inputEmail = screen.getByLabelText('Email');
        const inputNotes = screen.getByLabelText('Notes');

        fireEvent.change(inputCompany, {target: {value:'Test Company'}});
        fireEvent.change(inputPosition, {target: {value:'Test Position'}});
        fireEvent.change(inputUrl, {target: {value:'http://test.com'}});
        fireEvent.change(inputDateApplied, {target: {value:"2024-06-11"}});
        fireEvent.change(inputStatusId, {target: {value:1}});
        fireEvent.change(inputContact, {target: {value: 'TestContact'}});
        fireEvent.change(inputEmail,{target:{value: 'test@gmail.com'}});
        fireEvent.change(inputNotes, {target: {value: 'test note'}});

        const submitButton = screen.getByRole('button', {name: /submit/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
              "http://localhost:3000/applications/submitForm",
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        company: 'Test Company',
                        position: 'Test Position',
                        url: 'http://test.com',
                        date_applied: '2024-06-11',
                        status_id: '1',
                        contact: 'TestContact',
                        email: 'test@gmail.com',
                        notes: 'test note'
                    })
                })
            );
            expect(screen.getByText('Record Submission Successfully!')).toBeInTheDocument();
        }); 
    });

    it('displays an error message when company and position are empty', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: () => Promise.resolve({
                "message": "Company and position should not be empty"
            })
        });

        render(<Dashboard />);
        const submitButton = screen.getByRole('button', {name: /submit/i });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('Submission Failed, please try again.')).toBeInTheDocument();
        });
    });
    
})