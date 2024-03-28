import React, { useContext, useState } from "react";
import { Popup, Polyline, useMapEvents } from "react-leaflet";
import { Context } from "../App";

function RenderPaths({ position, statuses }) {
  const [selectedID, setSelectedID] = useContext(Context);

  for (const status of statuses) {
    if (position.statusId === status.id) {
      if (position.polyline != null) {
        let polyline = [];
        position.polyline.features.map((feature) => {
          let coordinates = feature.geometry.coordinates;
          const reversedCoordinates = [coordinates[1], coordinates[0]];
          polyline.push(reversedCoordinates);
        });

        console.log(status);

        useMapEvents({
          click(e) {
            setSelectedID(0);
          },
        });

        let opacity = 1;
        if (selectedID === status.id) {
          opacity = 1;
        } else if (selectedID !== 0 && selectedID !== status.id) {
          opacity = 0.5;
        }

        return (
          <Polyline
            eventHandlers={{
              click: (e) => {
                setSelectedID(status.id);
                console.log("Clicked: ", status.id);
              },
            }}
            key={position.statusId}
            positions={polyline}
            pathOptions={{ color: "#ff5e4c", opacity: opacity }}
          >
            <Popup>{status.username} Test</Popup>
          </Polyline>
        );
      }
    }
  }
}

export default RenderPaths;
