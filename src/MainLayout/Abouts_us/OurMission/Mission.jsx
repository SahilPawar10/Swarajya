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
      <div className="table-container">
        <div className="table-inner">
          <table></table>
          <thead>
            <tr>
              <th>Thematic Goals</th>
              <th>
                <table>
                  <tbody>
                    <tr>Vertical Technical Focus</tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tbody>
                </table>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>1</tr>
                    <tr>3</tr>
                    <tr>5</tr>
                    <tr>7</tr>
                    <tr>9</tr>
                    <tr>0</tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>1</tr>
                    <tr>2</tr>
                    <tr>4</tr>
                    <tr>6</tr>
                    <tr>8</tr>
                    <tr>0</tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
      <div className="swarajy-diff">Our Difference</div>
      <div className="mission-programs">Mission Programs</div>
      <div className="mission-image-with-text">Mission Image with text</div>
    </div>
  );
};

export default withLayout(Mission);
