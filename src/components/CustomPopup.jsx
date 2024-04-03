import React from "react";
import { Popup } from "react-leaflet";

function CustomPopup({ status }) {
  return (
    <Popup className="popup">
      <div
        style={{
          // backgroundColor: "red",
          width: "105%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          alignItems: "baseline",
        }}
      >
        <a
          href={"https://traewelling.de/@" + status.username}
          target={"_blank"}
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: "bolder",
          }}
        >
          {status.username}
        </a>
        <img
          style={{
            width: 65,
            height: 65,
            borderRadius: "100%",
            position: "relative",
            bottom: -35,
            border: "solid",
            borderWidth: 2,
            marginLeft: 10,
          }}
          src={status.profilePicture}
          alt={`Profile picture of ${status.username}`}
        />
      </div>
      <div
        style={{
          width: 300,
          backgroundColor: "#0C0C0C",
          padding: 5,
          border: "solid",
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: 16, margin: 5 }}>
          Von:
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {status.train.origin.name}
          </span>
        </p>

        <div
          style={{
            margin: 0,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            style={{ height: 80 }}
            src="/traewelling-livemap/assets/arrow.png"
            alt={`Profile picture of ${status.username}`}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: 7,
            }}
          >
            <p style={{ fontSize: 13, margin: 0 }}>
              {new Date(status.train.origin.arrival).toLocaleDateString(
                "de-DE",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>

            <p style={{ fontSize: 13, margin: 0 }}>
              {new Date(status.train.destination.departure).toLocaleDateString(
                "de-DE",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>
        </div>

        <p style={{ fontSize: 16, margin: 5 }}>
          Nach:
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {status.train.destination.name}
          </span>
        </p>
      </div>
    </Popup>
  );
}

export default CustomPopup;
