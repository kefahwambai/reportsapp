import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';


function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        const token = userData.token;
        sessionStorage.setItem('jwt', token);

        if (userData.admin === true) {
          setMessage('Login Successful');
          setUser(userData);
          navigate('/admin');
        } else if (userData.admin === false) {
          setUser(userData);
          navigate('/home');
        }
      } else {
        const errorData = await response.json();
        setLoginError(errorData.error);
      }
    } catch (error) {
      setLoginError('Login failed');
      console.error(error);
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
