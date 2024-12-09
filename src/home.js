import React, { useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import MapContainerComponent from './mapComponents';

const HomePage = () => {

    const [location, setLocation] = useState({ latitude: 51.505, longitude: -0.09 });

    const handleSaveLocation = (latitude, longitude) => {
        setLocation({ latitude, longitude });
        console.log("Updated location:", { latitude, longitude });
    };

    const handleLogout = () => {
        console.log('Logged out');
        window.location.href = '/signin';
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Latitude:", latitude, "Longitude:", longitude);
                    handleSaveLocation(latitude, longitude);
                },
                (error) => {
                    console.error("Error obtaining location:", error.message);
                    alert("Unable to fetch location.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Welcome to the Home Page !
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                        This is the main page where you can access your account features.
                    </Typography>
                    <Button sx={{ mt: 10 }} onClick={getLocation}>Get CurrentLocation</Button>
                    <center><MapContainerComponent location={location} /></center>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
export default HomePage