import React, { useState } from "react";
import "./about.css";
import { Link } from "react-router-dom";
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
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    <img src={slider1} alt="carosou1" />
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2>Save children from severe malnutrition</h2>
                  </div>
                  <p className="slide-desc">
                    While India’s economy has grown well, the country has the
                    highest number of stunted children in the world (40.6
                    million). India is home to one-third of the global total of
                    stunted children under the age of five.
                  </p>
                  {/* <div className="button">Donate</div> */}

                  <Link to="/donate" className="program-button">
                    <span className="text">Know More</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="st">
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    <img src={slider3} alt="carosou1" />
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2>Save children from severe malnutrition</h2>
                  </div>
                  <p className="slide-desc">
                    While India’s economy has grown well, the country has the
                    highest number of stunted children in the world (40.6
                    million. India is home to one-third of the global total of
                    stunted children under the age of five.
                  </p>
                  {/* <div className="button">Donate</div> */}

                  <Link to="/donate" className="program-button">
                    <span className="text">Know More</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="st">
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    <img src={slider2} alt="carosou1" />
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2>Save children from severe malnutrition</h2>
                  </div>
                  <p className="slide-desc">
                    While India’s economy has grown well, the country has the
                    highest number of stunted children in the world (40.6
                    million). India is home to one-third of the global total of
                    stunted children under the age of five.
                  </p>
                  {/* <div className="button">Donate</div> */}

                  <Link to="/donate" className="program-button">
                    <span className="text">Know More</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="st">
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    <img src={slider1} alt="carosou1" />
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2>Save children from severe malnutrition</h2>
                  </div>
                  <p className="slide-desc">
                    While India’s economy has grown well, the country has the
                    highest number of stunted children in the world (40.6
                    million). India is home to one-third of the global total of
                    stunted children under the age of five.
                  </p>
                  {/* <div className="button">Donate</div> */}

                  <Link to="/donate" className="program-button">
                    <span className="text">Know More</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="nav-auto">
              <div className="a-b1"></div>
              <div className="a-b2"></div>
              <div className="a-b3"></div>
              <div className="a-b4"></div>
            </div> */}
          </div>
          {/* <div className="nav-m">
            <label htmlFor="radio1" className="m-btn"></label>
            <label htmlFor="radio2" className="m-btn"></label>
            <label htmlFor="radio3" className="m-btn"></label>
            <label htmlFor="radio4" className="m-btn"></label>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default About;
