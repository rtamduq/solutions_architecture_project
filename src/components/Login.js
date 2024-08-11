// src/components/Login.js
import React, { useState, useContext } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authenticate';
import { AuthContext } from "./../Authentication/AuthContext"

import '../assets/styles/Login.css'; // Import the updated CSS file

const Login = () => {
  const Navigate = useNavigate();
  const { user, signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr, setLoginErr] = useState('');


  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === '' && password === '') {
        setEmailErr("Email is Required");
        setPasswordErr("Password is required");
        resolve({ email: "Email is Required", password: "Password is required" });
      }
      else if (email === '') {
        setEmailErr("Email is Required");
        resolve({ email: "Email is Required", password: "" });
      }
      else if (password === '') {
        setPasswordErr("Password is required");
        resolve({ email: "", password: "Password is required" });
      }
      else if (password.length < 6) {
        setPasswordErr("Must be 6 characters");
        resolve({ email: "", password: "Must be 6 characters" });
      }
      else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then(async (res) => {
        if (res.email === '' && res.password === '') {
          try {
            const result = await signIn(email, password);
            setLoginErr('');
            if (result?.accessToken?.jwtToken) {
              Navigate('/dashboard');
            }
          } catch (err) {
            setLoginErr(err.message);
          }
        }
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <h2 style={{color: '#000'}}>Login to the Book Application</h2>
      <div className='form'>
        <div className="formfield">
          <TextField
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
            helperText={emailErr}
          />
        </div>
        <div className='formfield'>
          <TextField
            value={password}
            onChange={(e) => formInputChange("password", e.target.value)}
            type="password"
            label="Password"
            helperText={passwordErr}
          />
        </div>
        <div className='formfield'>
          <Button type='submit' variant='contained' onClick={handleClick}>Login</Button>
        </div>
        <Typography className="error">{loginErr}</Typography>
      </div>
    </div>
  )
}

export default Login;
