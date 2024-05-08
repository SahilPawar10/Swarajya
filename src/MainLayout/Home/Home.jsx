import React, { useEffect } from "react";
import "./home.css";
import { Link } from "react-scroll";
import Navbar from "../Navbar/Navbar";
import slider1 from "../../assets/Banner-7.jpg";
import slider2 from "../../assets/Banner-6.jpg";
import slider3 from "../../assets/banner-3.jpg";

import Program from "../Programs/Program";
import Vision from "../Visions/Vision";
import Donate from "../DonateUS/Donate";
import RecentWork from "../RecentWorks/RecentWork";
// import Footer from "../footer/Footer";
import withLayout from "../index";
import { getIpDetails } from "../../api/apiService";

const Home = (props) => {
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

  let counter = 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      document.getElementById("radio" + counter).checked = true;
      counter++;
      if (counter > 3) {
        counter = 1;
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  window.addEventListener("scroll", revealDiv);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    async function showPosition(position) {
      console.log("Latitude: " + position.coords.latitude);

      console.log("Longitude: " + position.coords.longitude);

      const data = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      await getIpDetails(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");

          break;

        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");

          break;

        case error.TIMEOUT:
          console.log("The request to get user location timed out.");

          break;

        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");

          break;
      }
    }
  }, []);
  return (
    <div>
      <div className="section2 ">
        <div className="home">
          <div className="container">
            {/* <div className="banner1">
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
            </div> */}

            <section className="home-carosoul">
              <div className="home-slider">
                <div className="slide">
                  <input type="radio" name="radio-btn" id="radio1" />
                  <input type="radio" name="radio-btn" id="radio2" />
                  <input type="radio" name="radio-btn" id="radio3" />
                  {/* <input type="radio" name="radio-btn" id="radio4" /> */}
                  <div className="homeSlide first">
                    <div className="st-text ">
                      <h1>
                        <span style={{ color: "#cc6017" }}>
                          Harmony for Humanity:
                        </span>{" "}
                        Nurturing Well-being through Social Engagement
                      </h1>
                    </div>
                    <div className="st-btn">
                      <Link
                        to="donateUs"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="btn-donateUs"
                      >
                        <span className="text">DonateUs</span>
                        <span className="icon">
                          <i
                            class="fa fa-heart icon-heart"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </Link>
                    </div>
                    <img src={slider1} alt="" />
                  </div>
                  <div className="homeSlide">
                    <div className="st-text">
                      <h1>
                        Empowering Communities Through Joy and Social
                        Initiatives.
                      </h1>
                    </div>
                    <div className="st-btn">
                      <Link
                        to="donateUs"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="btn-donateUs"
                      >
                        <span className="text">DonateUs</span>
                        <span className="icon">
                          <i
                            class="fa fa-heart icon-heart"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </Link>
                    </div>
                    <img src={slider2} alt="" />
                  </div>
                  <div className="homeSlide">
                    <div className="st-text">
                      <h1 className="banner-3-text">
                        United for the Swarajya : From Our People , <br /> For
                        Our People
                      </h1>
                    </div>
                    <div className="st-btn">
                      <Link
                        to="donateUs"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="btn-donateUs"
                      >
                        <span className="text">DonateUs</span>
                        <span className="icon">
                          <i
                            class="fa fa-heart icon-heart"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </Link>
                    </div>
                    <img src={slider3} alt="" />
                  </div>
                </div>
              </div>
            </section>
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
      <div className="section6 reveal">
        <RecentWork />
      </div>
      <div className="section7">{/* <Footer /> */}</div>
    </div>
  );
};

// export default Home;
export default withLayout(Home);
