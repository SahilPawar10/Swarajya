import React from "react";
import "./banner.css";
export default function Banner({ image, mob_image, submenu1, submenu2 }) {
  return (
    <div>
      <div className="mission-banner">
        <div className="mission-banner-img">
          <img src={image} alt="" />
        </div>
        <img src={mob_image} alt="" className="mob-img" />
        <div className="front-view-container">
          <div className="row">
            <div className="insider-header">
              <div className="front-view-inside">
                <div className="small-nav">
                  <p>
                    Home > {submenu1} > {submenu2}
                  </p>
                </div>
                <div className="misson-header">
                  <div className="mision-header-text">
                    <h4>{submenu2}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
