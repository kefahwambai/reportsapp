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

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = {
      user: {
        email: email,
        password: password,
      },
    };
  
    const response = fetch('https://ireporter-th6z.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: "Bearer" + localStorage.getItem("token")
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          // Successful response
          return res.json();
        } else {
          // Handle the error response here and set the error message
          throw new Error('Login failed. Please check your credentials.');
        }
      })
      .then((user) => {
        
        if (user.admin === true) {
          setMessage("Login Successful");
          setUser(user);
          navigate('/admin');
        } else if (user) {
          setUser(user);
          navigate('/home');
        } else {
          console.log('User data is missing in the response.');
        }
      })
      .catch((error) => {
        setLoginError(error.message); // Set error message here
        console.log('Error:', error);
      });
  }
  
     

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
