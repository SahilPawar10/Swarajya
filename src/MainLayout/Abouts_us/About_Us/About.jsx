import React, { useState } from "react";
import "./about.css";
import withLayout from "../..";
import Banner from "../../Components/Banner";
import aboutBanner from "../../../assets/bhajani_mandal1.jpg";
// import aboutBanner from "../../../assets/visionmission_banner.jpg";
import aboutBanne_Mob from "../../../assets/bhajani_mandal.jpeg";

function About() {
  return (
    <div id="aboutus">
      <Banner
        image={aboutBanner}
        mob_image={aboutBanne_Mob}
        submenu1={"About Us"}
        submenu2={"About Us "}
      />

      {/* <img src={aboutBanne_Mob} alt="" /> */}
    </div>
  );
}

// export default About;

export default withLayout(About);
