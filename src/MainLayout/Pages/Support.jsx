import React from "react";
import Banner from "../Components/Banner";
import pledgeBanner from "../../assets/pledge-banner-2023 (1).png";
import Contact from "../Components/ContactUS/Contact";

function Support() {
  return (
    <div>
      <Banner
        image={pledgeBanner}
        mob_image={pledgeBanner}
        submenu1={""}
        submenu2={"Your Support"}
      />

      <div className="pledge-text">
        <p>
          Each individual is different in his beliefs and vision. Understanding
          this, we have curated unique campaigns that support different causes
          like education, health, nutrition, and safety needs of marginalised
          communities, with the common goal to provide them a life of dignity.
        </p>
        <p>
          We urge you to check all our active campaigns below, as we are
          convinced that you will find a calling that you would like to answer.
          Contribute a small share of your earnings towards a cause that is
          close to your heart.
        </p>
        <div className="support-btn">Suuport Now</div>
        <Contact />
      </div>
    </div>
  );
}

export default Support;
