import React, { useState } from "react";
import "./about.css";
import withLayout from "../..";
import Banner from "../../Components/Banner";
import aboutBanner from "../../../assets/about-banner.jpg";
// import aboutBanner from "../../../assets/visionmission_banner.jpg";
import aboutBanne_Mob from "../../../assets/about-banner_mob.jpg";

function About() {
  return (
    <div id="aboutus">
      <Banner
        image={aboutBanner}
        mob_image={aboutBanne_Mob}
        submenu1={"About Us"}
        submenu2={"About Us "}
      />
    </div>
  );
}

// export default About;

export default withLayout(About);
