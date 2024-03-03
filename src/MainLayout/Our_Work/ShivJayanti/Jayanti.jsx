import React from "react";
import "./jayanti.css";
import Banner from "../../Components/Banner";
import withLayout from "../..";
import jayantiImage from "../../../assets/jayantiBanner.jpeg";
import shobhaYatra from "../../../assets/jayantiProg1.jpg";
import bhashan from "../../../assets/bhashan2.jpg";
import { Link } from "react-router-dom";

function Jayanti() {
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
              <img className="jay-pro" src={bhashan} alt="" />
              <h4>Child Champion</h4>
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
      <div className="jayanti-Gallery">
        <div className="jaya-progr-heading">
          <h2>Gallery</h2>
        </div>
      </div>
    </div>
  );
}

export default withLayout(Jayanti);
