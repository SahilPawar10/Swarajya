import React from "react";
import withLayout from "../..";
import "./mission.css";
import missionBanner from "../../../assets/visionmission_banner.jpg";

const Mission = () => {
  return (
    <div style={{ backgroundColor: "orange" }}>
      <div className="mission-banner">
        <img src={missionBanner} alt="" />
      </div>

      <div className="front-view">
        <div className="small-nav">Home > Who we are > Vision and Mission</div>
        <div className="misson-header-text">Vision and Mission</div>
      </div>

      <div className="desc-about-mission">small Description of mission</div>
      <div className="table-bg">background of table (image)</div>
      <div className="table">Table with information</div>
      <div className="swarajy-diff">Our Difference</div>
      <div className="mission-programs">Mission Programs</div>
      <div className="mission-image-with-text">Mission Image with text</div>
    </div>
  );
};

export default withLayout(Mission);
