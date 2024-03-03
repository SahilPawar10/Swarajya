import React, { useRef, useEffect } from "react";
import "./jayanti.css";
import Banner from "../../Components/Banner";
import withLayout from "../..";
import jayantiImage from "../../../assets/jayantiBanner.jpeg";
import shobhaYatra from "../../../assets/jayantiProg1.jpg";
import bhashan from "../../../assets/bhashan2.jpg";
import haldiKunku from "../../../assets/haldi-kunku.jpg";
import JayatiGal1 from "../../../assets/bhajani_mandal.jpeg";
import JayantiGal2 from "../../../assets/Education-top-10-blog-banner.jpg";
import JayantiGal3 from "../../../assets/health-banner.jpg";
import JayantiGal4 from "../../../assets/involved_bannermob.jpg";
import JayantiGal5 from "../../../assets/our_beliefBannermob.png";
import { Link } from "react-router-dom";

function Jayanti() {
  const scrollContainerRef = useRef(null);
  // const scrollContainer = scrollContainerRef.current;

  useEffect(() => {
    let scrollContainer = document.getElementById("jayantiGallery");
    let backButton = document.getElementById("backBtn");
    let nextButton = document.getElementById("nextBtn");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaX;
    });

    nextButton.addEventListener("click", () => {
      console.log("nextClicked");
      scrollContainer.scrollLeft += 370;
    });

    backButton.addEventListener("click", () => {
      console.log("backClicked");
      scrollContainer.scrollLeft -= 370;
    });
  }, []);

  return (
    <div>
      <Banner
        image={jayantiImage}
        mob_image={jayantiImage}
        submenu1={"Our Works"}
        submenu2={"Shiv Jayanti"}
      />
      <div className="jayanti-info contenr-1200 ">
        <h2>Why it Matters ?</h2>
        <div className="shivJayanti-info">
          <p>
            <b>Shivaji Maharaj Jayanti </b>is celebrated annually to commemorate
            the birth anniversary of Chhatrapati Shivaji Maharaj, a legendary
            figure in Indian history. <br /> He is renowned for his remarkable
            leadership, military prowess, and administrative acumen.{" "}
            <b>
              Shivaji Maharaj established the Maratha Empire in the 17th
              century,
            </b>
            bravely resisting the dominance of the Mughal Empire and other
            regional powers. His enduring legacy lies in his unwavering
            commitment to protecting his people from oppression and upholding
            the principles of justice and freedom. Celebrating Shivaji Maharaj
            Jayanti not only honors his extraordinary life but also serves as a
            reminder of the rich cultural heritage of <b>Maharashtra</b> that he
            championed. His stories continue to inspire generations, symbolizing
            courage, patriotism, and resilience. <br />
            This occasion brings communities together, fostering unity and pride
            among the people of Maharashtra and beyond, as they reflect on the
            enduring impact of Shivaji Maharaj's legacy on Indian society.
          </p>
        </div>
      </div>
      {/* -----------------------------------------Jayanti Programs-------------------------------------------------- */}
      <div className="jayanti-programs contenr-1200">
        <div className="jaya-progr-heading">
          <h2>Key Programs</h2>
        </div>
        <div className="jayanti-progr-types">
          <div className="jay-pro-type-item">
            <div className="jay-pro-img">
              <img className="jay-pro" src={shobhaYatra} alt="" />
              <h4>Shobha Yatra</h4>
            </div>
            <div className="jay-pro-content">
              <div className="jay-pro-content-details">
                <div className="type-name">
                  <h4>What is ShivJayanti ?</h4>
                  <p>
                    We organize a procession on Shiv Jayanti where we sing
                    traditional songs of Shivaji Maharaj and enlighten the
                    people. This procession takes place throughout the entire
                    village.
                  </p>
                  <Link className="read-more">
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="jay-pro-type-item">
            <div className="jay-pro-img">
              <img className="jay-pro" src={bhashan} alt="" />
              <h4>Child Champion</h4>
            </div>
            <div className="jay-pro-content">
              <div className="jay-pro-content-details">
                <div className="type-name">
                  <h4>
                    Speech contests <br />
                  </h4>
                  <p>
                    We conduct children's speech contests. These competitions
                    serve as a platform for young minds to develop their
                    communication skills, critical thinking abilities, and
                    confidence, empowering them to excel in various aspects of
                    life
                  </p>
                  <Link className="read-more">
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="jay-pro-type-item">
            <div className="jay-pro-img">
              <img className="jay-pro" src={haldiKunku} alt="" />
              <h4>Haldi KumKum</h4>
            </div>
            <div className="jay-pro-content">
              <div className="jay-pro-content-details">
                <div className="type-name">
                  <h4>
                    Kerala Flood <br />
                    Response
                  </h4>
                  <p>
                    Rapid aid to the destruction and loss caused by the flooding
                    and landslides in Idukki and Wayanad.
                  </p>
                  <Link className="read-more">
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="jay-pro-type-item">
            <div className="jay-pro-img">
              <img className="jay-pro" src={shobhaYatra} alt="" />
              <h4>Procession</h4>
            </div>
            <div className="jay-pro-content">
              <div className="jay-pro-content-details">
                <div className="type-name">
                  <h4>
                    Kerala Flood <br />
                    Response
                  </h4>
                  <p>
                    Rapid aid to the destruction and loss caused by the flooding
                    and landslides in Idukki and Wayanad.
                  </p>
                  <Link className="read-more">
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------------------------------Jayanti Gallery-------------------------------------------------- */}
      <div className="jayanti-Gallery contenr-1200">
        <div className="jaya-progr-heading">
          <h2>Gallery</h2>
        </div>
        <div className="gallery-slider">
          <span id="backBtn">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </span>
          <div className="images" id="jayantiGallery" ref={scrollContainerRef}>
            <img src={bhashan} alt="" />
            <img src={haldiKunku} alt="" />
            <img src={jayantiImage} alt="" />
            <img src={shobhaYatra} alt="" />
            <img src={JayatiGal1} alt="" />
            <img src={JayantiGal2} alt="" />
            <img src={JayantiGal3} alt="" />
            <img src={JayantiGal4} alt="" />
            <img src={JayantiGal5} alt="" />
          </div>
          <span id="nextBtn">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default withLayout(Jayanti);
