import React, { useState } from "react";
import "./about.css";
import { Link } from "react-router-dom";
import slider1 from "../../assets/WhatsApp Image 2023-11-07 at 9.16.39 PM.jpeg";
import slider2 from "../../assets/kirtan.jpeg";
import slider3 from "../../assets/haldiKunku.jpeg";
function About() {
  return (
    <div id="aboutus">
      {/* <h1>About Us</h1> */}
      <img src={slider2} alt="shiv" />
    </div>
  );
}

export default About;
