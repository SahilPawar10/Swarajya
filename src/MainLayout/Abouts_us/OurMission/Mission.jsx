import React from "react";
import withLayout from "../..";
import "./mission.css";
import missionBanner from "../../../assets/visionmission_banner.jpg";

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
              <div className="heading">dsjsb</div>
              <div className="heading-text">abahbk</div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-bg">background of table (image)</div>
      <div className="table">Table with information</div>
      <div className="swarajy-diff">Our Difference</div>
      <div className="mission-programs">Mission Programs</div>
      <div className="mission-image-with-text">Mission Image with text</div>
    </div>
  );
};

export default withLayout(Mission);
