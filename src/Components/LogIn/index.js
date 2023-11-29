import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';

export default () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: false,
        password: false,
      });
    const handleLogin = () => {
       
        console.log('Logging in with:', { username, password });
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }}>
            <div>
                <Typography variant="h5" align="center" gutterBottom>
                    Welcome to Project Management
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                            >
                                Log In
                            </Button>
                            </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};


