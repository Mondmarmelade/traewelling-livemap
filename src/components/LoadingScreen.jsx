import React from "react";
import { Sentry } from "react-activity";
import "react-activity/dist/library.css";

function LoadingScreen({ LoadingMessage }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Sentry color="#ff5e4c" size={56} speed={0.6} animating={true} />
      <p style={{ fontSize: 24, color: "#ff5e4c" }}>{LoadingMessage}</p>
    </div>
  );
}

export default LoadingScreen;
