import React, { useState, useEffect } from "react";
import { Box, Typography, Container, useMediaQuery } from "@mui/material";
import MapContainerComponent from "../components/map/mapComponents";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
// import PrimarySearchAppBar from "../components/appBar";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSaveLocation = (latitude, longitude) => {
    setLocation({ latitude, longitude });
    console.log("Updated location:", { latitude, longitude });
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
      {/* <PrimarySearchAppBar /> */}
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