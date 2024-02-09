import React from "react";
import loading from "./Bean Eater-1s-200px (1).gif";

const Spinner = () => {
  return (
    <div
      className="text-center d-flex"
      style={{
        height: "70vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
