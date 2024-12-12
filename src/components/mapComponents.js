import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button, useMediaQuery } from "@mui/material";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

// Custom icon
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const RecenterMap = ({ latitude, longitude }) => {
  const map = useMap();
  map.setView([latitude, longitude], map.getZoom());
  return null;
};

const MapContainerComponent = ({ location, onRecenter }) => {
  const { latitude, longitude } = location;
  const isMobile = useMediaQuery("(max-width:600px)");

  const actions = [
    {
      name: "Recenter",
      icon: (
        <img
          src="/img/recenter.png"
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
          src="/img/navigate.png"
          alt="Navigate"
          style={{ height: "40px", width: "40px" }}
        />
      ),
      onClick: () => onRecenter(),
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        height: isMobile ? "60vh" : "80vh",
        width: "100%",
      }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RecenterMap latitude={latitude} longitude={longitude} />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>
            Current Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
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
