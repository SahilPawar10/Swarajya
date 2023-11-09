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
      <div className="carosoul-section">
        <div className="container-fluid carosoul">
          <div
            id="carouselExampleSlidesOnly"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner  ">
              <div
                class="carousel-item active box-shadow"
                data-bs-interval="3000"
              >
                <div class="container ">
                  <div class="row  ">
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
                        While India’s economy has grown well, the country has
                        the highest number of stunted children in the world
                        (40.6 million). India is home to one-third of the global
                        total of stunted children under the age of five.
                      </p>
                      {/* <div className="button">Donate</div> */}

                      <Link to="/donate" className="program-button">
                        <span className="text">Know More</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item  box-shadow" data-bs-interval="6000">
                <div class="container text-center">
                  <div class="row align-items-start">
                    <div class="col">
                      <div className="image-section">
                        <img src={slider2} alt="carosou1" />
                      </div>
                    </div>
                    <div class="col img-desc ">
                      <div className="slide-title">
                        <h2>A girl with a book is a vaccine against poverty</h2>
                      </div>
                      <p className="slide-desc">
                        Education is severely impacted due to COVID-19. The
                        education of more than 247 million school children has
                        got impacted and most affected have been girls from
                        marginalized communities
                      </p>

                      <Link to="/donate" className="program-button">
                        <span className="text">Know More</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item box-shadow" data-bs-interval="9000">
                <div class="container text-center">
                  <div class="row align-items-start">
                    <div class="col">
                      <div className="image-section">
                        <img src={slider3} alt="carosou1" />
                      </div>
                    </div>
                    <div class="col img-desc ">
                      <div className="slide-title">
                        <h2>Healthy Mothers, Healthy Future</h2>
                      </div>
                      <p className="slide-desc">
                        Lend a helping hand in the last-mile delivery of
                        adequate nutrition to pregnant and lactating mothers.
                      </p>

                      <Link to="/donate" className="program-button">
                        <span className="text">Know More</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Program;
