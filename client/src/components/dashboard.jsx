import React from 'react';
import { useState } from 'react';
import ApplicationList from './application-list-component/application-list.jsx';
import Sidebar from './sidebar';
import jobhub from '../assets/jobhub.png'

const dashboard = () => {
  const [dateApplied, setDateApplied] = useState('');
  const [appStatus, setAppStatus] = useState(''); 

  const handleOnChange = (e) => {
    e.preventDefault();
    setDateApplied(e.target.value);
  };

  const handleAppStatus = () => {
    e.preventDefault();
    setAppStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Hello');
  };

  return (
    <div className='main'>
      <br></br>
      {/* <h1 className='header'>JobHub</h1> */}
      <div className='dashboard-top-container'> 
        <div className='form_box'>
          <div className='jobhub'>
           <img src={jobhub} alt="" />
          </div>
          <form className='inputs'>
            {' '}
            Job Application Form
            <input
              type='text'
              className='placeholderText'
              placeholder='Company Name '
            ></input>
            <input
              type='date'
              id='start'
              name='date_applied'
              value={dateApplied}
              min='2024-01-01'
              max='2028-12-31'
              onChange={handleOnChange}
            />
            <form className='status'>
              <select name='Status' id='status' onChange={handleAppStatus}>
                <option value='' disabled selected hidden>
                  Select App Status...
                </option>
                <option value='Need to Apply'>Need to Apply</option>
                <option value='Applied'>Applied</option>
                <option value='Phone Interview'>Phone Interview</option>
                <option value='Online Assessment'>Online Assessment</option>
                <option value='Initial Interview'>Initial Interview</option>
                <option value='Second Interview'>Second Interview</option>
                <option value='Third Interview'>Third Interview</option>
                <option value='Technical Interview'>Technical Interview</option>
                <option value='Behavioral Interview'>Behavioral Interview</option>
                <option value='Final Interview'>Final Interview</option>
                <option value='Have not heard back'>Have not heard back</option>
                <option value='Considering'>Considering</option>
                <option value='Offer'>Offer</option>
                <option value='Rejected'>Rejected</option>
                <option value='Ghost'>Ghost</option>
                <option value='Other'>Other</option>
                <option value='STOP'>STOP</option>
              </select>
            </form>
            <input type='text' className='placeholderText' placeholder='Position '></input>
            <button type='submit' className='btn' onSubmit={handleSubmit}>
              Submit
            </button>
          </form>
          <ApplicationList />
        </div>
        <Sidebar />
        
      </div>
      <br></br>
    </div>
  );
};

export default dashboard;
