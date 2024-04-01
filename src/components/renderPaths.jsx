import React, { useContext, useEffect, useState } from "react";
import { Popup, Polyline, useMapEvents, Circle, Marker } from "react-leaflet";
import { Context } from "../App";
import "../style/Popup.css";
import { Icon } from "leaflet";

function RenderPaths({ status, polyline }) {
  const [selectedID, setSelectedID] = useContext(Context);
  const [color, setColor] = useState("#ff5e4c");
  const [pointsShown, setPointsShown] = useState(false);

  const homeIcon = new Icon({
    iconUrl: "/traewelling-livemap/assets/homeIcon.png",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
  const finishIcon = new Icon({
    iconUrl: "/traewelling-livemap/assets/flagIcon.png",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  useMapEvents({
    click(e) {
      setSelectedID(0);
      setPointsShown(false);
    },
  });

  let polishedPolyline = [];
  polyline.geometry.coordinates.map((coordinates) => {
    const reversedCoordinates = [coordinates[1], coordinates[0]];
    polishedPolyline.push(reversedCoordinates);
  });

  useEffect(() => {
    if (selectedID !== 0 && selectedID !== status.id) {
      setColor("#fec1ba");
    } else {
      setColor("#ff5e4c");
    }
  }, [selectedID]);

  return (
    <>
      {pointsShown ? (
        <>
          <Marker position={polishedPolyline[0]} icon={homeIcon} />
          <Marker position={polishedPolyline.at(-1)} icon={finishIcon} />
        </>
      ) : null}
      <Polyline
        eventHandlers={{
          click: (e) => {
            setSelectedID(status.id);
            setPointsShown(true);
            console.log("Clicked: ", status);
          },
        }}
        key={status.id}
        positions={polishedPolyline}
        pathOptions={{ color: color }}
      >
        <Popup className="popup">
          <div style={{ width: 200, height: 100 }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "75%" }}>
                <p>Von: {status.train.origin.name}</p>
                <p>Zu: {status.train.destination.name}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: 50, height: 50, borderRadius: "100%" }}
                  src={status.profilePicture}
                  alt={`Profile picture of ${status.username}`}
                />
              </div>
            </div>
            <a href={"https://traewelling.de/@" + status.username}>
              {status.username}
            </a>
          </div>
        </Popup>
      </Polyline>
    </>
  );
}

export default RenderPaths;
