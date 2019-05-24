import React from "react";
import spinner from "./Spinner.svg";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{ width: "100px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
