import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button, AppBar, Toolbar, useMediaQuery } from "@mui/material";
import MapContainerComponent from "../components/mapComponents";
import PushNotificationComponent from "../components/PushNotificationComponent";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PrimarySearchAppBar from "../components/AppBar.tsx";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [value, setValue] = React.useState(0);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSaveLocation = (latitude, longitude) => {
    setLocation({ latitude, longitude });
    console.log("Updated location:", { latitude, longitude });
  };

  // const handleLogout = () => {
  //   console.log("Logged out");
  //   window.location.href = "/signin";
  // };

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

  // Fetch location when the component mounts
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* <PrimarySearchAppBar/> */}
      {/* <AppBar position="static">
      </AppBar> */}

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "calc(100% - 64px)", // Subtract AppBar height
        }}
      >
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
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
