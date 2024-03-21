import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "./App.css";

function App() {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    fetch("https://traewelling.de/api/v1/positions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setPositions(data.data);
      });

    // return () => {
    //   second;
    // };
  }, []);

  const reverseCoordinates = (coordinates) => {
    return [coordinates[1], coordinates[0]];
  };

  return (
    <>
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
        {positions?.map((item) => {
          if (item.polyline != null) {
            let polyline = [];

            item.polyline.features.map((feature) => {
              let coordinates = feature.geometry.coordinates;
              const reversedCoordinates = [coordinates[1], coordinates[0]];
              polyline.push(reversedCoordinates);
            });

            console.log(polyline);
            return (
              <>
                <Polyline
                  key={item.statusId}
                  positions={[polyline]}
                  pathOptions={{ color: "#ff5e4c" }}
                >
                  <Popup>{item.status.user.username}</Popup>
                </Polyline>
              </>
            );
          }
        })}
        {/* <Marker
          position={[51.505, -0.09]}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </>
  );
}

export default App;
