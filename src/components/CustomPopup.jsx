import React from "react";
import { Popup } from "react-leaflet";

function CustomPopup({ status }) {
  return (
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
  );
}

export default CustomPopup;
