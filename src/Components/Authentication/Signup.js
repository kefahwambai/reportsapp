import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

export default function SignUp({setUser}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [id_number, setIdNumber] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
 
 
  const [showPassword, setShowPassword] = useState('');
  // const csrfToken = document.querySelector('meta[name="csrf-token"]')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setSignupError('Password and confirmation do not match.');
      return;
    }
   
    if (id_number.length !== 8) {
      setSignupError('ID number must be 8 digits long.');
      return;
    }

    const formData = {
      user: {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        id_number: id_number,
      },
    };

    
    
    const response = fetch('https://ireporter-th6z.onrender.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "accept": "application/json"        
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.setItem('token', response.headers.get("Authorization"))
        if (user) {              
                    
          setMessage('Account Created');
          setTimeout(() => {
            navigate('/login');
          }, 1234);
        } else {
          setSignupError(user.error);
        }
      })
      .catch((error) => {
        setSignupError('Signup failed');
        console.error(error);
      });
  };

 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          {message && (<Alert severity='success' sx={{ mb:2 }}>{message}</Alert>)}
            {signupError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {signupError}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  autoComplete="name"
                  value={name}
                  required onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  required onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  required onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password-confirmation"
                  value={passwordConfirmation}
                  required onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="id_number"
                  label="ID Number"
                  type="text"
                  id="idNumber"
                  autoComplete="ID Number"
                  value={id_number}
                  required onChange={(e) => setIdNumber(e.target.value)}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p>
                  Already have an account?{' '}
                  <Link to="/login" variant="body2">
                    Sign in
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
