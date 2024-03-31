import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "./App.css";
import RenderPaths from "./components/renderPaths";
import LoadingScreen from "./components/LoadingScreen";

export const Context = React.createContext();

function App() {
  const [positions, setPositions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Status abfragen");
    fetch("https://traewelling.de/api/v1/statuses")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error fetching polyline data");
        }
      })
      .then((data) => {
        setStatuses(data.data);
      })
      .catch((error) => {
        console.error("Error fetching statuses:", error);
      });
  }, []);

  useEffect(() => {
    if (statuses.length !== 0) {
      getPolylines();
    }
  }, [statuses]);

  const getPolylines = () => {
    setLoadingMessage("Routen abfragen");

    let IDs = "";
    statuses.forEach((status) => {
      IDs += `${status.id},`;
    });

    fetch("https://traewelling.de/api/v1/polyline/" + IDs)
      .then((response) => response.json())
      .then((data) => {
        setPolylines(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingScreen LoadingMessage={loadingMessage} />;
  }

  if (!isLoading) {
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

          {statuses.map((status) => {
            const matchingPolyline = polylines.features.find(
              (polyline) => polyline.properties.statusId === status.id
            );

            if (matchingPolyline === undefined) {
              return;
            } else {
              return (
                <RenderPaths
                  key={status.id}
                  status={status}
                  polyline={matchingPolyline}
                />
              );
            }
          })}
        </MapContainer>
      </Context.Provider>
    );
  }
}

export default App;
