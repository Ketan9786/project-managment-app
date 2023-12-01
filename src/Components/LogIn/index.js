import React, { useState } from 'react';
import { Container, Typography, Box, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slice/userSlice';
import Cookies from "js-cookie";

export default () => {
    const dispatch = useDispatch();
    axios.defaults.withCredentials = true;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const token = useSelector((state) => state.userLogin.token);
    const navigate = useNavigate();


    const handleLogIn = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                const storedToken = Cookies.get('token');
                console.log(storedToken)
                if (storedToken) {
                    dispatch(loginUser(storedToken));
                } else {

                }
                navigate("/dashboard");
            })
            .catch(error => {
                console.error("Login failed:", error);
                // Handle error, maybe display an error message to the user
            });
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
                        onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                        margin="normal"
                        required

                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
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
