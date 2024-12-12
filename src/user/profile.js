import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PrimarySearchAppBar from "../components/AppBar.tsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with the actual user ID or fetch from authentication context
    const userId = '675975e1989be57593f127e1';

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/user/${userId}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center" sx={{ mt: 5 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <PrimarySearchAppBar/>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Profile Details
        </Typography>
        <Typography variant="h6">Name: {user.username || 'N/A'}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Contact Number: {user.contactNumber}</Typography>
        <Typography variant="h6">Location: {user.location || 'N/A'}</Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
            Back to Map
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
