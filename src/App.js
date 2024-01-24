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
import Topbar from './Components/Topbar/topbar';
import Logo from './Components/Logobar/logo';


function App() {  
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt');
   
    if (storedToken) {
      const [, payloadBase64] = storedToken.split('.'); 
      try {
        const decodedPayload = atob(payloadBase64); 
        const parsedPayload = JSON.parse(decodedPayload);
        
        setUser(parsedPayload); 
      } catch (error) {
        console.error('Error parsing token payload:', error);
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
      console.log("User not found");
    }
  }, []);
  return (
    <div>
       <Topbar/>
       <Logo/>            
        <Navbar user={user} setUser={setUser} />
        <Routes>          
            <Route path="/home" element={<Home user={user} setUser={setUser}  />} />
            <Route path="/reports" element={<Complaints />} />
            <Route path="/admin" element={<AdminHome user={user} setUser={setUser}  />} />      
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
