import React from "react";
import "./vision.css";
import slider1 from "../../assets/child-yputh.jpg";
import slider2 from "../../assets/education.jpg";
import slider3 from "../../assets/about-header.jpg";
import vision4 from "../../assets/cleanlines.jpg";

function Vision() {
  return (
    <div id="vision">
      <div className="vision-text">
        <div className="heading">
          <h2>Swarajya: Pioneering Joyful Community Empowerment</h2>
        </div>
        <div className="heading2">
          <h2>Enriching Lives Since Day One</h2>
        </div>
        <h2 style={{ margin: "50px 10px", fontSize: "50px", color: "#004e7e" }}>
          Our Focus
        </h2>
      </div>
      <div className="vision-images">
        <div className="vision-type type1">
          <h3>Health</h3>
          <img src={slider1} alt="" />
          <div className="type-header">
            <h4>Health 103.7 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="vision-type type2">
          <h3>Education</h3>
          <img src={slider2} alt="" />
          <div className="type-header">
            <h4> Education 0.32 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="vision-type">
          <h3>Livelihood</h3>
          <img src={slider3} alt="" />
          <div className="type-header">
            <h4> Livelihood 0.88 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="vision-type type3">
          <h3>Activities</h3>
          <img src={vision4} alt="" />
          <div className="type-header">
            <h4> Disaster Relief 13 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vision;
//

// asjasas jbjb jbn n jnjnj njjnj jbjb knkns kbk hss
