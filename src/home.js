import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button, AppBar, Toolbar, useMediaQuery } from "@mui/material";
import MapContainerComponent from "./mapComponents";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";


const HomePage = () => {
  const [location, setLocation] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSaveLocation = (latitude, longitude) => {
    setLocation({ latitude, longitude });
    console.log("Updated location:", { latitude, longitude });
  };

  const handleLogout = () => {
    console.log("Logged out");
    window.location.href = "/signin";
  };

  const fetchCurrentLocation = () => {
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
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Q-Buddy
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "calc(100% - 64px)",
        }}
      >
        <Box sx={{ mt: 2, width: "100%", flexGrow: 1 }}>
          {location ? (
            <MapContainerComponent location={location} onRecenter={fetchCurrentLocation} />
          ) : (
            <Typography>Loading your location...</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;