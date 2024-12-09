import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Replace with your desired icon URL
  iconSize: [38, 38], 
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});


const RecenterMap = ({ latitude, longitude }) => {
  const map = useMap();
  map.setView([latitude, longitude], map.getZoom());
  return null;
};

const MapContainerComponent = ({ location }) => {
  const { latitude, longitude } = location;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "500px", width: "70%" }}
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
  );
};

export default MapContainerComponent;
