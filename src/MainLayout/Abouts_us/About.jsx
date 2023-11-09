import React, { useState } from "react";
import "./about.css";
import slider1 from "../../assets/WhatsApp Image 2023-11-07 at 9.16.39 PM.jpeg";
import slider2 from "../../assets/kirtan.jpeg";
import slider3 from "../../assets/haldiKunku.jpeg";
function About() {
  let counter = 1;
  setInterval(() => {
    document.getElementById("radio" + counter).checked = true;
    counter++;
    if (counter > 4) {
      counter = 1;
    }
  }, 5000);

  return (
    <div id="aboutus">
      <section className="section">
        <div className="slider">
          <div className="slide">
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />
            <input type="radio" name="radio-btn" id="radio4" />
            <div className="st first">
              <img src={slider1} alt="" />
            </div>
            <div className="st">
              <img src={slider2} alt="" />
            </div>
            <div className="st">
              <img src={slider3} alt="" />
            </div>
            <div className="st">
              <img src={slider1} alt="" />
            </div>
            <div className="nav-auto">
              <div className="a-b1"></div>
              <div className="a-b2"></div>
              <div className="a-b3"></div>
              <div className="a-b4"></div>
            </div>
          </div>
          <div className="nav-m">
            <label htmlFor="radio1" className="m-btn"></label>
            <label htmlFor="radio2" className="m-btn"></label>
            <label htmlFor="radio3" className="m-btn"></label>
            <label htmlFor="radio4" className="m-btn"></label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
