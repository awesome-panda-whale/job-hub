import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Dashboard from "./components/dashboard.jsx";
import Navbar from "./components/NavBar.jsx";
import Application from "./components/Application.jsx";
// import Home from "./components/Home.jsx";
import { AuthProvider } from "./Contexts/AuthContext.js";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="users/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="users/dashboard" element={<Dashboard />} />
          <Route path="/application" element={<Application />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
