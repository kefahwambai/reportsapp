import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt');

    if (storedToken) {
      const [, payloadBase64] = storedToken.split('.');
      try {
        const decodedPayload = atob(payloadBase64);
        const parsedPayload = JSON.parse(decodedPayload);

        const expirationTime = parsedPayload.exp * 1000; 
        const currentTime = new Date().getTime();

        if (currentTime > expirationTime) {
          setUser(null);
          sessionStorage.removeItem('jwt');
          navigate('/login');
        } else {
          setUser(parsedPayload);
        }
      } catch (error) {
        console.error('Error parsing token payload:', error);
      }
    } else {
      console.log('User not found');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        console.error("No JWT token found in local storage.");
        return;
      }
      sessionStorage.removeItem("jwt");
      setUser(null);   
      navigate("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div>
       <Topbar/>
       <Logo/>            
        <Navbar user={user} setUser={setUser}  handleLogout={handleLogout}  />
        <Routes>          
            <Route path="/home" element={<Home user={user} setUser={setUser}  />} />
            <Route path="/reports" element={<Complaints  user={user} setUser={setUser}  />} />
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
