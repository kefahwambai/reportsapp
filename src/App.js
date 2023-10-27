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
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./Components/Authentication/ForgotPassword";

function App() {
  const sessionUser = useSelector((state) => state.session.user);


  

  return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<Header />} />            
            {sessionUser ? (
          <>
            <Route path="/reports" element={<Complaints />} />
            <Route path="/admin" element={<AdminHome />} /> 
            <Route path="/home" element={<Home  />} />     
            
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminsignup" element={<AdminSignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
          </>
        )}
            
            
        
        </Routes>
        <Footer />      
    </div>
  );
}

export default App;
