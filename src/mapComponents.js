import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import GeoSearchControl from "leaflet-geosearch/dist/geosearch.umd.js";
import { Box, Button, TextField, Tooltip } from "@mui/material";

const RecenterMap = ({ locations, latitude, longitude }) => {
  const map = useMap();
  if (locations && locations.length > 0) {
    const bounds = L.latLngBounds(locations);
    map.fitBounds(bounds);
  }
  return null;
};

const currentLocationIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const searchedLocationIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7976/7976202.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const MapContainerComponent = ({ location, onRecenter }) => {

  const [searchedLocation, setSearchedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { latitude, longitude } = location;
  const [markers, setMarkers] = useState([
    { lat: location?.latitude, lng: location?.longitude, type: "current" },
  ]);
  const mapRef = useRef(null);

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
        if (!prevMarkers.some((marker) => marker.lat === searchedLoc.lat && marker.lng === searchedLoc.lng)) {
          return [...prevMarkers, { ...searchedLoc, type: "search", label: searchQuery }];
        }
        return prevMarkers;
      });
    } else {
      alert('Location not found!');
    }
  };

  useEffect(() => {
    if (!location) return;
    setMarkers([{ lat: location.latitude, lng: location.longitude, type: "current" }]);
  }, [location]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        autoComplete: true,
        autoCompleteDelay: 250,
        showMarker: false,
      });

      map.addControl(searchControl);

      map.on("geosearch/showlocation", (result) => {
        const { x: lng, y: lat, label } = result.location;
        setMarkers((prevMarkers) => {
          const markerExists = prevMarkers.some(
            (marker) => marker.lat === lat && marker.lng === lng
          );

          if (!markerExists) {
            const newMarkers = [
              ...prevMarkers,
              { lat, lng, type: "search", label, key: `${lat}-${lng}` },
            ];
            return newMarkers;
          }
          return prevMarkers;
        });
      });

      return () => {
        map.removeControl(searchControl);
        map.off("geosearch/showlocation");
      };
    }
  }, []);

  useEffect(() => {
    if (location && searchedLocation) {
      onRecenter();
    }
  }, [location, searchedLocation, onRecenter]);

  return (
    <div style={{ position: "relative", height: "80vh", width: "100%" }}>
      <Box display="flex" gap={1} alignItems="center">
        <TextField
          label="Search Location"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearchLocation}>
          Search
        </Button>
      </Box>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%", marginTop: "10px" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RecenterMap
          locations={[
            { lat: location?.latitude, lng: location?.longitude },
            ...(searchedLocation ? [{ lat: searchedLocation.lat, lng: searchedLocation.lng }] : []),
          ]}
        />
        {searchedLocation && (
          <Marker icon={searchedLocationIcon} position={[searchedLocation.lat, searchedLocation.lng]}>
            <Popup>{`Searched Location`}</Popup>
          </Marker>
        )}
        {markers.map(({ lat, lng, type, label }, index) => {
          console.log("Rendering Marker:", { lat, lng, type, label });
          return (
            <Marker
              key={index}
              position={[lat, lng]}
              icon={type === "current" ? currentLocationIcon : searchedLocationIcon}
            >
              <Popup>{type === "current" ? "Your Current Location" : label || "Searched Location"}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <Tooltip title="Recenter the Map">
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
      </Tooltip>
    </div>
  );
};

export default MapContainerComponent;
