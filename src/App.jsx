import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "./App.css";
import RenderPaths from "./components/renderPaths";
import LoadingScreen from "./components/LoadingScreen";

export const Context = React.createContext();

function App() {
  const [positions, setPositions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Positionen abfragen");
    fetch("https://traewelling.de/api/v1/positions")
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // console.log(data);
        setPositions(data.data);
      })
      .catch((error) => {
        console.error("Error fetching positions:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(true);
    setLoadingMessage("Status abfragen");
    fetch("https://traewelling.de/api/v1/statuses")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setStatuses(data.data);
      })
      .catch((error) => {
        console.error("Error fetching statuses:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingScreen LoadingMessage={loadingMessage} />;
  }

  if (statuses.length !== 0 && positions.length !== 0 && !isLoading) {
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
