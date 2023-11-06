import React from "react";
import "./home.css";
import Navbar from "../Navbar/Navbar";
import slider1 from "../../assets/hand_together.jpg";
import slider2 from "../../assets/Education-top-10-blog-banner.jpg";
import slider3 from "../../assets/hands.png";

function Home() {
  return (
    <div>
      <Navbar className="navbar" />
      <div className="home">
        <div className="container">
          <div className="banner1">
            <img src={slider1} alt="hands" />
            <div className="banner-text">
              <h1>Welcome To Swarajya Foundation</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aspernatur dolore quaerat et, necessitatibus
                sapiente!
              </p>
            </div>
          </div>
          <div className="banner2">
            <img src={slider2} alt="shiv" />
            <div className="banner-text">
              <h1>Welcome To Swarajya Foundation</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aspernatur dolore quaerat et, necessitatibus
                sapiente!
              </p>
            </div>
          </div>
          <div className="banner3">
            <img src={slider3} alt="hands" />
            <div className="banner-text">
              <h1>Welcome To Swarajya Foundation</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aspernatur dolore quaerat et, necessitatibus
                sapiente!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
