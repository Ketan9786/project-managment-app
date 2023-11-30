import React, { useState } from 'react';
import { Container, Typography, Box, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default () => {
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    password: '',
    email: '',
    mobileNumber: '',
    birthDate: '',
    gender: 'male',
  });

const navigate =useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
   
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register',userDetails)
    .then(result => {
      
      console.log(result)
      setUserDetails({
        fullName: '',
        password: '',
        email: '',
        mobileNumber: '',
        birthDate: '',
        gender: 'male',
      })  
      navigate("/login")
    })
    .catch(err=> console.log(err))
 
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Register Now</Typography>
      
        <form onSubmit={handleSignIn}>
          <TextField
            label="Full Name"
            name="fullName"
            value={userDetails.fullName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
           
          />
          <TextField
            label="Password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            type="password"
            
          />

          <TextField
            label="E-mail"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            type="email"
            
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={userDetails.mobileNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            type="number"
            
          />
          <TextField
            label=""
            name="birthDate"
            value={userDetails.birthDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            type="date"
          
          />
          <Select value={userDetails.gender} onChange={handleInputChange} name="gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          </form>
   
      </Box>
    </Container>
  );
};
