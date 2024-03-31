import React, { useContext, useEffect, useState } from "react";
import { Popup, Polyline, useMapEvents } from "react-leaflet";
import { Context } from "../App";
import "../style/Popup.css";

function RenderPaths({ status, polyline }) {
  const [selectedID, setSelectedID] = useContext(Context);
  const [color, setColor] = useState("#ff5e4c");

  useMapEvents({
    click(e) {
      setSelectedID(0);
    },
  });

  let polishedPolyline = [];
  polyline.geometry.coordinates.map((coordinates) => {
    const reversedCoordinates = [coordinates[1], coordinates[0]];
    polishedPolyline.push(reversedCoordinates);
  });

  useEffect(() => {
    if (selectedID !== 0 && selectedID !== status.id) {
      setColor("#ff8d80");
    } else {
      setColor("#ff5e4c");
    }
  }, [selectedID]);

  return (
    <Polyline
      eventHandlers={{
        click: (e) => {
          setSelectedID(status.id);
          console.log("Clicked: ", status);
        },
      }}
      key={status.id}
      positions={polishedPolyline}
      pathOptions={{ color: color, opacity: 1 }} //#ff8d80
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
                // width: "25%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
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
  );
}

export default RenderPaths;
