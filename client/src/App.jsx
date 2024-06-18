import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
// import Dashboard from './components/dashboard.jsx';
import Dashboard from './pages/Dashboard.js';
import Navbar from './components/Navbar.jsx';
import Application from './pages/Application.js';
import Home from './pages/Home.js';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/application' element={<Application />} />
      </Routes>
    </div>
  );
}
