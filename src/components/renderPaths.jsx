import React from "react";
import { Popup, Polyline } from "react-leaflet";

function RenderPaths({ position, statuses }) {
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

        return (
          <Polyline
            key={position.statusId}
            positions={polyline}
            pathOptions={{ color: "#ff5e4c" }}
          >
            <Popup>{status.username} Test</Popup>
          </Polyline>
        );
      }
    }
  }
}

export default RenderPaths;
