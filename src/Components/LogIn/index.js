import React, { useState } from 'react';
import { Container, Typography, Box, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default () => {
    // const [logInDetails, setLogInDetails] = useState({
    //     email: '',
    //     password: ''
    // });

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

const navigate = useNavigate();

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target || e;
    //     setLogInDetails((prevDetails) => ({
    //         ...prevDetails,
    //         [name]: value,
    //     }));
        
    // };

    const handleLogIn = (e) => {
      
        e.preventDefault();
        axios.post('http://localhost:3001/login',{email,password})
        .then(result => {
            console.log(result)
            navigate("/dashboard")
        })
        .catch(err => console.log(err))
       
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Welcome To Project Mangment App</Typography>

                <form onSubmit={handleLogIn}>
                    <TextField
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        fullWidth
                        margin="normal"
                        required
                       
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        
                    />


                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Log In
                    </Button>
                </form>

            </Box>
        </Container>
    );
};
