import React from "react";
import "./about.css";
import slider1 from "../../assets/WhatsApp Image 2023-11-07 at 9.16.39 PM.jpeg";
import slider2 from "../../assets/kirtan.jpeg";
import slider3 from "../../assets/haldiKunku.jpeg";
function About() {
  return (
    <div id="aboutus">
      <div className="row">
        <div className="image-section">
          <img src={slider1} alt="carosou1" />
        </div>
        <div className="desc-section">
          <div className="img-desc">
            <div className="slide-title">
              <h2>Title</h2>
            </div>
            <p className="slide-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
              sed?
            </p>
            <div className="button">Donate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
