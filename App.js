import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Homepage from './components/Homepage/homepage';
import Login from './components/Login/login';
import Register from './components/Register/register';
import AdminHomePage from './components/Homepage/adminHomePage'; 
import UserHomePage from './components/Homepage/userHomePage'; 
import Dashboard from './components/Homepage/dashboard'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-home" element={<AdminHomePage />} />
          <Route path="/user-home" element={<UserHomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
