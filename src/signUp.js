import React, { useState } from 'react';
import { TextField, Button, Select, Link, MenuItem, Grid, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!role) {
      setError("Please select a role");
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError('');
    setSuccess('');

    const userData = { name, email, password, contactNumber, role };

    try {
      const response = await axios.post('https://q-buddy-backend-1.onrender.com/user/signup', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess('User created successfully!');
      setError('');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error creating user');
      setSuccess('');
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
        <img style={{ height: "20vh", width: "60%" }} src="QB-Logos.png" />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            color='#02333C'
            fullWidth
            label="Full Name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <TextField
            margin="normal"
            required
            color='#02333C'
            fullWidth
            label="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            inputProps={{
              pattern: "[0-9]{10}",
            }}
          />
          <Select
            margin="normal"
            required
            color='#02333C'
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem color='#02333C' value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem color='#02333C' value="Partner">Partner</MenuItem>
            <MenuItem color='#02333C' value="User">User</MenuItem>
          </Select>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{
            mt: 3,
            mb: 2,
            color: '#99BCC4',
            backgroundColor: '#02333C',
            '&:hover': {
              backgroundColor: '#014850' 
            }
          }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link sx={{ color: '#014850' }} href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
