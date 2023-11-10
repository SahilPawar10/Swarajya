import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./program.css";
import slider1 from "../../assets/WhatsApp Image 2023-11-07 at 9.16.39 PM.jpeg";
import slider2 from "../../assets/kirtan.jpeg";
import slider3 from "../../assets/haldiKunku.jpeg";
import About from "../Abouts_us/About";

function Program() {
  return (
    <div id="programs">
      <div class="circle_box">
        <div>
          <svg>
            <circle cx="150" cy="150" r="140" />
            <circle cx="150" cy="150" r="140" />
          </svg>
          <span>
            <img src={slider1} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Program;
