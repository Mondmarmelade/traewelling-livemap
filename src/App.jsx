import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "./App.css";
import RenderPaths from "./components/renderPaths";
import { Sentry } from "react-activity";
import "react-activity/dist/library.css";

export const Context = React.createContext();

function App() {
  const [positions, setPositions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedID, setSelectedID] = useState(0);

  useEffect(() => {
    fetch("https://traewelling.de/api/v1/positions")
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // console.log(data);
        setPositions(data.data);
      })
      .catch((error) => {
        console.error("Error fetching positions:", error);
      });

    fetch("https://traewelling.de/api/v1/statuses")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setStatuses(data.data);
      })
      .catch((error) => {
        console.error("Error fetching statuses:", error);
      });
  }, []);

  if (statuses.length === 0 && positions.length === 0) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sentry color="#ff5e4c" size={56} speed={0.6} animating={true} />{" "}
      </div>
    );
  }

  if (statuses.length !== 0 && positions.length !== 0) {
    return (
      <Context.Provider value={[selectedID, setSelectedID]}>
        <MapContainer
          center={[51.1633908, 10.4477191]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: "100vh", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {positions.map((position) => (
            <RenderPaths
              key={position.statusId}
              position={position}
              statuses={statuses}
            />
          ))}
        </MapContainer>
      </Context.Provider>
    );
  }
}

export default App;
