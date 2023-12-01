import React, { useState } from 'react';
import { Container, Typography, Box, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../redux/slice/userData";
export default () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    password: '',
    email: '',
    mobileNumber: '',
    birthDate: '',
    gender: 'male',
  });
  React.useEffect(() => {

    dispatch(fetchUsers())
  }, [])

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

  };
  const isValidMobileNumber = (mobileNumber) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobileNumber);
  };

  const handleSignIn = async (e) => {

    e.preventDefault();

    try {
      if (Array.isArray(userData.data) && userData.data.some) {
        const isEmailTaken = userData.data.some((user) => user.email === userDetails.email);

        if (isEmailTaken) {
          alert("Email is already taken. Please choose another email.");
          return;
        }
      } else {
        console.error("userData is not an array or does not have a some method.");
        // Handle the error or return as needed
        return;
      }
      if (!isValidMobileNumber(userDetails.mobileNumber)) {
        alert("Invalid mobile number. Please enter a 10-digit number.");
        return;
      }

      // If email is not taken, proceed with registration
      await axios.post('http://localhost:3001/register', userDetails);
      alert("Registration successful");

      setUserDetails({
        fullName: '',
        password: '',
        email: '',
        mobileNumber: '',
        birthDate: '',
        gender: 'male',
      });

      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
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
