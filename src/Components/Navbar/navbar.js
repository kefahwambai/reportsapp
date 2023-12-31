import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import  "./navbar.css"
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../Authentication/session";
import Alert from '@mui/material/Alert';


function Navbar({user, setUser}) {
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate(); 
 
  
function handleLogoutClick() {
      fetch('https://ireporter-th6z.onrender.com/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }, }).then((r) => {
          if (r.ok) {
            setUser(null);
            navigate('/');
          }
        });
      }
  
  
    

  return (
      <div>
          <nav>
          {message && (<Alert severity='success' sx={{ mb:2 }}>{message}</Alert>)}
            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}                
            <ul>
              {user ? (
                  <>
                  {user. isAdmin ? (
                    <Link to="/admin" />
                  ):(
                    <li><Link to="/admin">Home</Link></li>
                  )}                  
                  </>
              ): (
                  <>
                  <li><Link to="/">Home</Link></li>   
                  </>
              )}                             
            </ul>
            {user ? (
              <>
              <button className="btnn" onClick={handleLogoutClick}> Logout </button> 
              </>

            ): (
              <>
                  <button className="btnn"> <Link to="/login" className="nav-link">Login</Link> </button> 
                  <button className="btnn"> <Link to="/signup" className="nav-link">Signup</Link> </button>           

              </>
              
            )}
          
          </nav>
      </div>
  )
}

export default Navbar