import React from "react";
import "./home.css";
import { Link } from "react-scroll";
import Navbar from "../Navbar/Navbar";
import slider1 from "../../assets/hand_together.jpg";
import slider2 from "../../assets/Education-top-10-blog-banner.jpg";
import slider3 from "../../assets/hands.png";
import About from "../Abouts_us/About";

function Home() {
  return (
    <div>
      <Navbar className="navbar" />
      <div className="home">
        <div className="container">
          <div className="banner1">
            <img src={slider1} alt="hands" />
            <div className="banner-text">
              <h1>
                Harmony for Humanity: Nurturing Well-being through Social
                Engagement
              </h1>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aspernatur dolore quaerat et, necessitatibus
                sapiente!
              </p> */}
            </div>
            <div className="banner-btn">
              <Link to="/donate" className="btn-donateUs">
                <span className="text">DonateUs</span>
                <span className="icon">
                  <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="banner2">
            <img src={slider2} alt="shiv" />
            <div className="banner-text">
              <h1> स्वराज्य - Empowering Through Self-Governance</h1>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aspernatur dolore quaerat et, necessitatibus
                sapiente!
              </p> */}
            </div>
            <div className="banner-btn">
              <Link to="/donate" className="btn-donateUs">
                <span className="text">DonateUs</span>
                <span className="icon">
                  <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="banner3">
            <img src={slider3} alt="hands" />
            <div className="banner-text">
              <h1>Empowering Communities Through Joy and Social Initiatives</h1>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aspernatur dolore quaerat et, necessitatibus
                sapiente!
              </p> */}
            </div>
            <div className="banner-btn">
              <Link to="/donate" className="btn-donateUs">
                <span className="text">DonateUs</span>
                <span className="icon">
                  <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <About />
    </div>
  );
}

export default Home;
