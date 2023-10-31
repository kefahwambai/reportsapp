import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./session";


function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false); 
  const sessionUser = useSelector(state => state.session.user);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await dispatch(sessionActions.login({ email, password }));
  
      if (response) {
        if (response.user) {
          if (response.user.admin === true) {
            setMessage("Login Successful");
            setUser(response.user);
            navigate('/admin');
          } else {
            setMessage("Login Successful");
            setUser(response.user);
            navigate('/home');
          }
        } else {
          setLoginError('User not found');
          // Optionally display the error message in your UI
        }
      } else {
        setLoginError('User not found');
        // Optionally display the error message in your UI
      }
  
    } catch (error) {
      console.error('Login error:', error);
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
    <div className="testlog">
      <form>
    
      {message && (<Alert severity='success' sx={{ mb:2 }}>{message}</Alert>)}
            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}      
      <div className="form-group mb-4">
        <label htmlFor="email">Email address</label>
        <input className="form-control" id="email" label="Email Address" name="email" autoComplete="email" value={email} required onChange={(e) => setEmail(e.target.value)} />

      </div>      
      <div className="form-group mb-4">
        <label htmlFor="password">Password</label>
        <input className="form-control" name="password" label="Password" type="password"  id="password" autoComplete="new-password" value={password} required onChange={(e) => setPassword(e.target.value)} />
      </div>

      {/* 2 column grid layout for inline styling */}
      <div className="form-row mb-4">
        <div className="col d-flex align-items-center">
          {/* Checkbox */}
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
            <label className="form-check-label" htmlFor="rememberMe"> Remember me </label>
          </div>
        </div>

        <div className="col d-flex justify-content-end">                  
          <p>Don't have an account? <Link to="/signup">Signup</Link>  </p>          
        </div>
        <div className="col d-flex justify-content-end">                  
          <p><Link to="/forgotpassword">Forgot Password ?</Link></p>          
        </div>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Login</button>
    </form>
    </div>
  );
}

export default Login;
