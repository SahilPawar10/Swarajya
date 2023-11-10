import React from "react";
import "./home.css";
import { Link } from "react-scroll";
import Navbar from "../Navbar/Navbar";
import slider1 from "../../assets/WhatsApp Image 2023-11-07 at 9.16.39 PM.jpeg";
import slider2 from "../../assets/kirtan.jpeg";
import slider3 from "../../assets/haldiKunku.jpeg";
import About from "../Abouts_us/About";
import Program from "../Programs/Program";

function Home() {
  return (
    <div>
      <Navbar className="navbar" />
      <div className="home">
        <div className="container">
          <div className="banner1">
            <img src={slider1} alt="hands" />
            <div className="banner-text text1 ">
              <h1>
                Harmony for Humanity: Nurturing Well-being through Social
                Engagement
              </h1>
            </div>
            <div className="banner-btn text1">
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
            <div className="banner-text text2 ">
              <h1> स्वराज्य - Empowering Through Self-Governance</h1>
            </div>
            <div className="banner-btn text2">
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
            <div className="banner-text text3 ">
              <h1>Empowering Communities Through Joy and Social Initiatives</h1>
            </div>
            <div className="banner-btn text3 ">
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
      {/* <Program /> */}
    </div>
  );
}

export default Home;
