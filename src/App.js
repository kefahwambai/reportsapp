import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Components/Header/header';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/Signup';
import AdminSignUp from './Components/Authentication/AdminSignup';
import Home from './Components/Home/Home';
import Complaints from './Components/Complaints/complaints';
import AdminHome from './Components/Home/AdminHome';

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    fetch('https://ireporter-vndn.onrender.com/me', {
      method: 'GET', 
      headers: {       
        'Content-type': 'application/json',
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then((user) => {         
      setUser(user);          
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  return (
    <div>
        <Navbar user={user} setUser={setUser} />
        <Routes>          
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/reports" element={<Complaints />} />
            <Route path="/admin" element={<AdminHome user={user} />} />      
            <Route path="/" element={<Header />} />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/adminsignup" element={<AdminSignUp setUser={setUser} />} />
        
        </Routes>
        <Footer />      
    </div>
  );
}

export default App;
