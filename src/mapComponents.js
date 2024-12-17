import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Box, Button, TextField, Tooltip, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

const RecenterMap = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = L.latLngBounds(locations);
      map.fitBounds(bounds);
    }
  }, [locations, map]);
  return null;
};

const useIcon = (url) =>
  useMemo(
    () =>
      L.icon({
        iconUrl: url,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
      }),
    [url]
  );

const MapContainerComponent = ({ location, onRecenter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState([]);

  const currentLocationIcon = useIcon("https://cdn-icons-png.flaticon.com/512/684/684908.png");
  const searchedLocationIcon = useIcon("https://cdn-icons-png.flaticon.com/128/7976/7976202.png");

  const mapRef = useRef(null);

  const addMarker = useCallback((newMarker) => {
    setMarkers((prevMarkers) => {
      const exists = prevMarkers.some(
        (marker) => marker.lat === newMarker.lat && marker.lng === newMarker.lng
      );
      return exists ? prevMarkers : [...prevMarkers, newMarker];
    });
  }, []);

  const handleSearchLocation = async () => {
    if (!searchQuery) return;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      const searchedLoc = {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
      setSearchedLocation(searchedLoc);

      setMarkers((prevMarkers) => {
        const filteredMarkers = prevMarkers.filter((marker) => marker.type !== "search");
        return [...filteredMarkers, { ...searchedLoc, type: "search", label: searchQuery }];
      });
    } else {
      alert("Location not found!");
    }
  };

  useEffect(() => {
    if (location) {
      const currentLocMarker = {
        lat: location.latitude,
        lng: location.longitude,
        type: "current",
      };
      addMarker(currentLocMarker);
    }
  }, [location, addMarker]);

  const actions = [
    {
      name: "Recenter",
      icon: (
        <img
          src="recenter.png"
          alt="Recenter"
          style={{ height: "40px", width: "40px" }}
        />
      ),
      onClick: () => onRecenter(),
    },
    {
      name: "Navigate",
      icon: (
        <img
          src="navigate.png"
          alt="Navigate"
          style={{ height: "40px", width: "40px" }}
        />
      ),
      onClick: () => onRecenter(),
    },
  ];

  return (
    <div style={{ position: "relative", height: "80vh", width: "100%" }}>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RecenterMap locations={markers.map(({ lat, lng }) => [lat, lng])} />
        {markers.map(({ lat, lng, type, label }, index) => (
          <Marker
            key={index}
            position={[lat, lng]}
            icon={type === "current" ? currentLocationIcon : searchedLocationIcon}
          >
            <Popup>{type === "current" ? "Your Current Location" : label || "Searched Location"}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        bgcolor="white"
        boxShadow={3}
        borderRadius={4}
        p={1}
        sx={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "90%", 
          maxWidth: "600px",
          "@media (max-width: 600px)": {
            flexDirection: "column",
            gap: 0.5,
          },
        }}
      >
        <TextField
          label="Search Location"
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  onClick={handleSearchLocation}
                  style={{ cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#4b4343" : "#f0f0f0", // Adaptable background
              color: (theme) =>
                theme.palette.mode === "dark" ? "#ffffff" : "#000000", // Text color adjusts
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#4b4343" : "#e0e0e0", // Subtle hover effect
              },
              "& .MuiInputBase-input": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#ffffff" : "black", // Input text adapts
              },
            },
          }}      
        />
      </Box>
      {/* <Tooltip title="Recenter the Map">
        <img
          src="https://cdn-icons-png.flaticon.com/128/1673/1673304.png"
          alt="Recenter"
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            cursor: "pointer",
            width: "50px",
            height: "50px",
          }}
          onClick={onRecenter}
        />
      </Tooltip> */}
    <SpeedDial
        ariaLabel="SpeedDial example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default MapContainerComponent;

