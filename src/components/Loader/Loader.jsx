import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <p className="loading">Loading...</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
