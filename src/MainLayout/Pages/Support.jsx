import React from "react";
import Banner from "../Components/Banner";
import withLayout from "..";
import pledgeBanner from "../../assets/pledge-banner-2023 (1).png";
import pledgeBannermob from "../../assets/mob-pledge.avif";
import Contact from "../Components/ContactUS/Contact";
import { Link } from "react-router-dom";

function Support() {
  return (
    <div>
      <Banner
        image={pledgeBanner}
        mob_image={pledgeBannermob}
        submenu1={""}
        submenu2={"Your Support"}
      />

      <div className="contenr-1200">
        <div className="pledge-text">
          <p>
            Each individual is different in his beliefs and vision.
            Understanding this, we have curated unique campaigns that support
            different causes like education, health, nutrition, and safety needs
            of marginalised communities, with the common goal to provide them a
            life of dignity.
          </p>
          <p>
            We urge you to check all our active campaigns below, as we are
            convinced that you will find a calling that you would like to
            answer. Contribute a small share of your earnings towards a cause
            that is close to your heart.
          </p>
          <div className="support-btn">
            <Link className="btn">
              Support Us
              <span>
                <i class="fa-solid fa-hand-holding-heart"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default withLayout(Support);
