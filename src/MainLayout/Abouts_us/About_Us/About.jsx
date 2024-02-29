import React, { useState } from "react";
import "./about.css";
import withLayout from "../..";
import Banner from "../../Components/Banner";
import aboutBanner from "../../../assets/about-banner.jpg";
// import aboutBanner from "../../../assets/visionmission_banner.jpg";
import aboutBanne_Mob from "../../../assets/about-banner_mob.jpg";
import tablebg from "../../../assets/cirle-motiff.svg";
import respectIcon from "../../../assets/respect-icon.svg";

function About() {
  return (
    <div id="aboutus">
      <Banner
        image={aboutBanner}
        mob_image={aboutBanne_Mob}
        submenu1={"About Us"}
        submenu2={"About Us "}
      />
      {/*--------------------------section 2------------------------------------ */}
      <div className="about-us-container">
        <div className="about-us-info">
          <div className="about-us-content">
            <h2>Here to Bring People Together to Help</h2>
            <p>
              We are a not-for-profit organisation that builds capacity of
              communities to ensure empowerment for marginalised women and
              girls. Our sustainable and holistic interventions in Health,
              Livelihood, Education and Disaster Relief & Resilience, provide
              innovative solutions to deep-rooted development problems.
            </p>
            <p>
              Along with access to the international confederation of expertise,
              we integrate internal knowledge and strong network of partnerships
              to deliver outcomes at scale to varied stakeholders.
            </p>
          </div>
        </div>
        <div className="about-us-image">
          <img src={aboutBanne_Mob} alt="" />
        </div>
      </div>
      {/* -------------------------------section 3--------------------------------- */}

      <div className="about-us-with-image">
        <div className="bg-image section-background-block "></div>
        <div className="desc diff-text-box">
          <div className="diff-text-row">
            <p className="padding-20">
              CARE India is a part of the CARE International Confederation,
              which is helping millions of people in living a life of dignity.
              We have a presence in over 100 countries.
            </p>
            <p className="padding-20">
              We have been contributing to India’s explosive growth for 75
              years, starting from the time when it was a newly formed nation,
              till today when it is among the world’s fastest developing
              economies.
            </p>
            <p className="padding-20">
              In 2021-22, we impacted the lives of more than 84.2 million
              people, through 90 projects, carried across 21 states.
            </p>
          </div>
        </div>
      </div>
      {/* ------------------------------section4--------------------- */}

      <div className="about-us-values contenr-1200">
        <div className="table-bg width25">
          <img src={tablebg} alt="" />
        </div>
        {/* web view header */}
        <div className="div-mid-header">
          <h2>
            Our <br />
            Core Values
          </h2>
        </div>
        {/* mobile view header */}
        <div className="div-mid-header-mob">
          <h2>
            Our <br />
            Core Values
          </h2>
        </div>
        {/* .....core values...... */}
        <div className="core-val-about">
          <div className="row">
            <div className="values-row">
              <div className="values">
                <img src={respectIcon} alt="" />
                <h2>Respect</h2>
                <p>Upholding the dignity of each individual</p>
              </div>
              <div className="values">
                <img src={respectIcon} alt="" />
                <h2>Integrity</h2>
                <p>Adhering to an ethical code of conduct in all actions</p>
              </div>
              <div className="values">
                <img src={respectIcon} alt="" />
                <h2>Commitment</h2>
                <p>Fulfilling our duties and social responsibilities</p>
              </div>
              <div className="values">
                <img src={respectIcon} alt="" />
                <h2>Excellence</h2>
                <p>
                  Setting high performance standards and being accountable to
                  them
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default About;

export default withLayout(About);
