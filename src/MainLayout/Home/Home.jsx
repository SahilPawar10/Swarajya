import React from "react";
import "./home.css";
import { Link } from "react-scroll";
import Navbar from "../Navbar/Navbar";
import slider1 from "../../assets/Banner-7.jpg";
import slider2 from "../../assets/Banner-6.jpg";
import slider3 from "../../assets/haldiKunku.jpeg";
import About from "../Abouts_us/About";
import Program from "../Programs/Program";
import Vision from "../Visions/Vision";
import Donate from "../DonateUS/Donate";

function Home() {
  const revealDiv = () => {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 150;
      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  };

  window.addEventListener("scroll", revealDiv);
  return (
    <div>
      <div className="section1 ">
        <Navbar className="navbar" />
      </div>
      <div className="section2 ">
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
                <Link
                  to="donateUs"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="btn-donateUs"
                >
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
                <Link
                  to="donateUs"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="btn-donateUs"
                >
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
                <h1>
                  Empowering Communities Through Joy and Social Initiatives
                </h1>
              </div>
              <div className="banner-btn text3 ">
                <Link
                  to="donateUs"
                  smooth={true}
                  duration={800}
                  offset={-80}
                  className="btn-donateUs"
                >
                  <span className="text">DonateUs</span>
                  <span className="icon">
                    <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section3 reveal">
        <Program />
      </div>
      <div className="section4 reveal">
        <Vision />
      </div>
      <div className="section5 reveal">
        <Donate />
      </div>
    </div>
  );
}

export default Home;
