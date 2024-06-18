import React from 'react';
import { useState, useEffect } from 'react';
import ApplicationList from './application-list-component/application-list.jsx';
import Sidebar from './sidebar';

const dashboard = () => {
  const [formData, setFormData] = useState({
    company:"",
    position:"",
    url:"",
    date_applied:"",
    status_id:"",
    contact:"",
    email:"",
    notes:"",
  });
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");
  const [statuses, setStatuses] = useState([
    { id: 1, status: 'Need to Apply' },
    { id: 2, status: 'Applied' },
    { id: 3, status: 'Phone Interview' },
    { id: 4, status: 'Online Assessment' },
    { id: 5, status: 'Initial Interview' },
    { id: 6, status: 'Second Interview' },
    { id: 7, status: 'Third Interview' },
    { id: 8, status: 'Technical Interview' },
    { id: 9, status: 'Behavioral Interview' },
    { id: 10, status: 'Final Interview' },
    { id: 11, status: 'Have not heard back' },
    { id: 12, status: 'Considering' },
    { id: 13, status: 'Offer' },
    { id: 14, status: 'Rejected' },
    { id: 15, status: 'Ghost' },
    { id: 16, status: 'Other' },
    { id: 17, status: 'STOP' }
  ]);
  

  // handle getting status
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/getStatus')
  //   .then(response => response.json())
  //   .then(data => setStatuses(data))
  //   .catch(error => console.log('Error Fetching Status: ', error));
  // }, []);

  // handle on change
  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  // handle submit form
  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    let responseData;
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3000/applications/submitForm", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error!');
      }

      const responseData = await response.json();
      if (responseData.success) {
        setMessage("Login Successfully!");
      } else {
        setError(responseData.message);
      }
    }catch (err) {
      setError("Submission Failed, please try again.");
    }
  }

  return (
    <div className='main'>
      {/* <h1 className='header'>JobHub</h1> */}
      <div className='dashboard-top-container'> 
        <div className='form_box'>
          <form className='inputs' onSubmit={handleSubmit}>
            <h1>Job Application Form:</h1>

            <div className="input-field">
              <label htmlFor="company">Company Name: </label>
              <input
              type='text'
              id ='company'
              name="company"
              value={formData.company}
              onChange={handleOnChange}
              placeholder='Company Name: '
              />
            </div>
          
            <div className="input-field">
              <label htmlFor="position">Position</label>
              <input
              type='text'
              id ='position'
              name='position'
              value={formData.position}
              onChange={handleOnChange}
              placeholder='Position'
              />
            </div>

            <div className="input-field">
              <label htmlFor="url">URL</label>
              <input
              type='url'
              id='url'
              name='url'
              value={formData.url}
              onChange={handleOnChange}
              placeholder='URL' 
              />
            </div>

            <div className="input-field">
              <label htmlFor="date_applied">Date Applied</label>
              <input
              type='date'
              id='start'
              name='date_applied'
              value={formData.date_applied}
              min='2024-01-01'
              max='2028-12-31'
              onChange={handleOnChange}
            />
            </div>
             
            <div className="input-field">
              <label htmlFor='staus'>Status</label>
              <select name='status_id' id='status' value={formData.status_id} onChange={handleOnChange}>
                <option value='' disabled selected hidden>
                  Select App Status...
                </option>
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="contact">Contact</label>
              <input
              type='text'
              id ='contact'
              name='contact'
              value={formData.contact}
              onChange={handleOnChange}
              placeholder='Contact'
              />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
              type='email'
              id ='email'
              name='email'
              value={formData.email}
              onChange={handleOnChange}
              placeholder='Email'
              />
            </div>

            <div className="input-field">
              <label htmlFor="notes">Notes</label>
              <input
              type='text'
              id ='notes'
              name='notes'
              value={formData.notes}
              onChange={handleOnChange}
              placeholder='Notes'
              />
            </div>

            <button type='submit' className='btn'>
              Submit
            </button>

          </form>
          <ApplicationList />
        </div>
        <Sidebar />     
      </div>
    </div>
  );
};

export default dashboard;
