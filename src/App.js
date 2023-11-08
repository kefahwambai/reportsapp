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
import { useSelector } from "react-redux";
import ForgotPassword from "./Components/Authentication/ForgotPassword";

function App() {
  // const sessionUser = useSelector((state) => state.session.user);  
  const [user, setUser] = useState(null);

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
