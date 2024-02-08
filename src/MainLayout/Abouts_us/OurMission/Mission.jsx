import React from "react";
import withLayout from "../..";
import "./mission.css";
import missionBanner from "../../../assets/visionmission_banner.jpg";
import tablebg from "../../../assets/cirle-motiff.svg";

const Mission = () => {
  return (
    <div className="mission-section">
      <div className="mission-banner">
        <img src={missionBanner} alt="" />
        <div className="front-view-container">
          <div className="row">
            <div className="insider-header">
              <div className="front-view-inside">
                <div className="small-nav">
                  <p> Home > Who we are > Vision and Mission</p>
                </div>
                <div className="misson-header">
                  <div className="mision-header-text">
                    <h4>Vision and Mission</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-desc-container">
        <div className="row">
          <div className="insider">
            <div className="mission-desc-text">
              <div className="col-main">
                <div className="heading">Our Vision</div>
                <div className="heading-text">
                  <p>
                    We seek a world of hope that is inclusive and just, where
                    all people live in dignity and security.
                  </p>
                </div>
              </div>
              <div className="col-main">
                <div className="heading">Our Vision</div>
                <div className="heading-text">
                  <p>
                    We seek a world of hope that is inclusive and just, where
                    all people live in dignity and security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-bg">
        <img src={tablebg} alt="" />

        {/* <h1>Welcome</h1> */}
      </div>
      <div className="table">Table with information</div>
      <div className="swarajy-diff">Our Difference</div>
      <div className="mission-programs">Mission Programs</div>
      <div className="mission-image-with-text">Mission Image with text</div>
    </div>
  );
};

export default withLayout(Mission);
