import React from "react";
import svg from "../python.svg";
import "../styles/components/Title.css";
function Title() {
  return (
    <div className="Title">
      <div className="language">
        <img src={svg} />
        <h2>api </h2>
      </div>

      <p className="para">in this courses you will learn python </p>
    </div>
  );
}

export default Title;
