import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import AuthContext from '../../context/auth/authContext';
import Alerts from '../Layout/Alerts'; // Ensure this component can display messages

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // Added state for alert message
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    if (error) {
      setMessage(error); // Set the message to display in Alerts
      clearErrors();  // Clear the error after it's been handled
    }
    
  }, [isAuthenticated, navigate, error, clearErrors]);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      setMessage('Please fill in all required fields and ensure password criteria are met.'); // Set an error message for form validation
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setMessage(null); // Clear any existing messages when form is valid
      await login({ email, password });
    }
  };

  return (
    <Fragment>
      {message && <Alerts message={message} />}
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Container>
    </Fragment>
  );
}

export default Login;
