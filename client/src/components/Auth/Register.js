import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Alerts from '../Layout/Alerts';

const Register = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { isAuthenticated, register, error, clearErrors } = authContext;


  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState('');

  const {
    name,
    email,
    password,
    password2
  } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      setFormErrorMessage(error);
      clearErrors();
    }
  }, [error, clearErrors]);
  useEffect(() => {
    if (isAuthenticated) {
      // Set the message immediately
      setMessage('Registration Successful! Redirecting to homepage...');

      // Delay navigation by 5 seconds
      const timerId = setTimeout(() => {
        // Navigate to home after 5 seconds
        navigate('/dashboard');

        console.log("Redirecting to home in 3 seconds...");
      }, 3000); // 3000 milliseconds = 3 seconds

      // Clear the timer if the component unmounts or if isAuthenticated changes before 5 seconds
      return () => clearTimeout(timerId);

      // Dependency array
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (password !== password2) {
      newErrors.password2 = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      setFormErrorMessage('Please fill in all required fields and ensure password criteria are met.');
    }

    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormErrorMessage('');
    if (validateForm()) {
      await register(user);
    }
  };
  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();  // Clear the error after it's been handled to prevent old error messages from persisting.
    }
  }, [error, clearErrors]);

  return (
    <Fragment>
        <Alerts message={message} />

    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      {formErrorMessage && (
        <Typography variant="subtitle2" color="error" gutterBottom>
          {formErrorMessage}
        </Typography>
      )}
      <form onSubmit={handleRegister}>
        <TextField
          label="Name"
          name='name'
          type="text"
          fullWidth
          margin="normal"
          value={name}
          onChange={onChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          name='email'
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={onChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name='password'
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={onChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          name='password2'
          type="password"
          fullWidth
          margin="normal"
          value={password2}
          onChange={onChange}
          error={!!errors.password2}
          helperText={errors.password2}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Register
        </Button>
      </form>
    </Container>
    </Fragment>

  );
};

export default Register;
