import React, { useContext, useEffect, useState } from "react";
import { Polyline, useMapEvents, Marker } from "react-leaflet";
import { Context } from "../App";
import "../style/Popup.css";
import { Icon } from "leaflet";
import CustomPopup from "./CustomPopup";

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
        <CustomPopup status={status} />
      </Polyline>
    </>
  );
}

export default RenderPaths;
