import React from "react";
import { useSelector, useDispatch, useState } from "react-redux";
import { Link } from 'react-router-dom';
import  "./navbar.css"
import { useNavigate } from "react-router-dom";
import * as sessionActions from "./session";
import Alert from '@mui/material/Alert';


function Navbar() {
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const user = sessionUser ? sessionUser.id : '';


  

  const handleLogoutClick = async (event) => {
    event.preventDefault();
  
    try {
      const response = await dispatch(sessionActions.logout());
  
      if (response) {
        setMessage("Logout Successful!");
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      if (error instanceof Error) {
        try {
          const data = await error.json();
          if (data && data.errors) {
            setLoginError(data.errors);
            // Optionally display the error message in your UI
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          // Handle JSON parsing error, and optionally display an error message in your UI
        }
      }
    }
  };
  
  
    

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