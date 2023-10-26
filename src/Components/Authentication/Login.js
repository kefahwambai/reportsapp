import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email,
      password
    }


    fetch('https://ireporter-vndn.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
     
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((user) => {
      // console.log(user.admin);
      if (user.admin === true) { // Check for an appropriate user identifier, e.g., 'id'
        // console.log('User data exists in the response:', data.user);
        setMessage("Login Successful")
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
      setLoginError(error)
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
          <p><Link to="/signup">Forgot Password</Link></p>          
        </div>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Login</button>
    </form>
    </div>
  );
}

export default Login;
