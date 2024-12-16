import React, { useState } from 'react';
import { TextField, Button, Link, Grid, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = { email, password };

        try {
            const response = await axios.post('https://q-buddy-backend-1.onrender.com/user/signin', userData);

            if (response.data.message === 'Login successful') {
                setSuccess(response.data.message);
                setError('');
                navigate('/dashboard');
            } else {
                setError('Invalid credentials');
                setSuccess('');
            }

        } catch (err) {
            setError('Invalid credentials');
            setSuccess('');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <img style={{ height: "20vh", width: "60%" }} src="QB-Logos.png" />
                <Typography sx={{ color: '#02333C' }} component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        color='#02333C'
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        color='#02333C'
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success">{success}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            color: '#99BCC4',
                            backgroundColor: '#02333C',
                            '&:hover': {
                                backgroundColor: '#014850'
                            }
                        }}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link sx={{ color: '#014850' }} href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link sx={{ color: '#014850' }} href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
