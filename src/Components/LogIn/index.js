import React, { useState } from 'react';
import { Container, Typography, Box, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export default () => {
    const [logInDetails, setLogInDetails] = useState({
        userName: '',
        password: ''
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target || e;
        setLogInDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        
    };

    const handleSignIn = (e) => {
      
        e.preventDefault();
        
        console.log(logInDetails)


    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Welcome To Project Mangment App</Typography>

                <form onSubmit={handleSignIn}>
                    <TextField
                        label="User Name"
                        name="userName"
                        value={logInDetails.userName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                       
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={logInDetails.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        
                    />


                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                </form>

            </Box>
        </Container>
    );
};
