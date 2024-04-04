import React from "react";
import { Popup } from "react-leaflet";

function CustomPopup({ status }) {
  let departure = status.train.origin.departure;
  let departurePlanned = status.train.origin.departurePlanned;
  let arrival = status.train.destination.arrival;
  let arrivalPlanned = status.train.destination.arrivalPlanned;
  let late = 0;

  if (arrival != arrivalPlanned) {
    let date2 = new Date(arrival);
    let date1 = new Date(arrivalPlanned);

    let diff = date2 - date1;
    late = Math.floor(diff / 1000 / 60) % 60;
  }

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
            {/* origin */}
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontSize: 13,
                  margin: 0,
                  marginRight: 5,
                  textDecoration:
                    departure != departurePlanned && "line-through",
                }}
              >
                {new Date(departurePlanned).toLocaleDateString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {departure != departurePlanned && (
                <p style={{ fontSize: 13, margin: 0, color: "#FF3A3A" }}>
                  {new Date(departure).toLocaleDateString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>

            {/* late */}
            {late > 0 && (
              <p style={{ fontSize: 13, margin: 0, color: "#FF3A3A" }}>
                +{late} Minuten
              </p>
            )}

            {/* destination */}
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontSize: 13,
                  margin: 0,
                  marginRight: 5,
                  textDecoration: arrival != arrivalPlanned && "line-through",
                }}
              >
                {new Date(arrivalPlanned).toLocaleDateString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {arrival != arrivalPlanned && (
                <p style={{ fontSize: 13, margin: 0, color: "#FF3A3A" }}>
                  {new Date(arrival).toLocaleDateString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
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
