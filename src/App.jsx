import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import RenderPaths from "./components/renderPaths";

function App() {
  const [positions, setPositions] = useState([]);
  const [statuses, setStatuses] = useState([]);

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

  // if (statuses.length === 0 && positions.length === 0) {
  //   return <p>Loading...</p>;
  // }

  if (statuses.length !== 0 && positions.length !== 0) {
    return (
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
    );
  }
}

export default App;
