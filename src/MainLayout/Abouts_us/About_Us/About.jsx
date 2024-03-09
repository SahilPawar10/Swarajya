import React, { useState } from "react";
import "./about.css";
import withLayout from "../..";
import Banner from "../../Components/Banner";
import aboutBanner from "../../../assets/about-banner.jpg";
// import aboutBanner from "../../../assets/visionmission_banner.jpg";
import aboutBanne_Mob from "../../../assets/about-banner_mob.jpg";
import tablebg from "../../../assets/cirle-motiff.svg";
import respectIcon from "../../../assets/respect-icon.svg";
import intigrityIcon from "../../../assets/integrity-icon.svg";
import commitmentIcon from "../../../assets/commitment-icon.svg";
import excellenceIcon from "../../../assets/excellence-icon.svg";

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
              Welcome to our <b> "SWARAJYA"</b> dedicated to making a difference
              in the lives of people in need. At our core, we believe in
              spreading happiness and providing assistance to those facing
              challenges.
            </p>
            <p className="padding-20">
              We began with a simple yet powerful vision: to create positive
              change one step at a time. By focusing on small targets, we ensure
              that every action we take has a meaningful impact.
            </p>
            <p className="padding-20">
              Our journey is just beginning, but our commitment to helping
              others remains unwavering. Join us as we work together to bring
              hope and support to those who need it most.
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
                <div className="image">
                  <img className="vals-img" src={respectIcon} alt="" />
                </div>

                <h2>Respect</h2>
                <p>Upholding the dignity of each individual</p>
              </div>
              <div className="values">
                <div className="image">
                  <img className="vals-img" src={intigrityIcon} alt="" />
                </div>

                <h2>Integrity</h2>
                <p>Adhering to an ethical code of conduct in all actions</p>
              </div>
              <div className="values">
                <div className="image">
                  <img className="vals-img" src={commitmentIcon} alt="" />
                </div>

                <h2>Commitment</h2>
                <p>Fulfilling our duties and social responsibilities</p>
              </div>
              <div className="values">
                <div className="image">
                  <img className="vals-img" src={excellenceIcon} alt="" />
                </div>

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
