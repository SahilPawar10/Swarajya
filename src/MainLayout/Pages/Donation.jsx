import React from "react";
import withLayout from "..";
import Banner from "../Components/Banner";
import DonationBanner from "../../assets/donate-banner.jpg";
import DonationBannerMob from "../../assets/donatemob.png";
import Donate from "../DonateUS/Donate";
import Contact from "../Components/ContactUS/Contact";

function Donation() {
  return (
    <div>
      <Banner
        image={DonationBanner}
        mob_image={DonationBannerMob}
        submenu1={""}
        submenu2={"Your Donation"}
      />
      <div className="contenr-1200">
        <div className="donation-text">
          <h5>Do a good Deed</h5>
          <div className="deed-info">
            <div className="info">
              CARE has been working in India for over 70 years, for the
              upliftment of marginalised women and girls through 53 programmes
              in 18 states and 130+ districts.
            </div>
            <div className="pie-chart">Pie Chart</div>
          </div>
        </div>
      </div>
      <Donate />
      <Contact />
    </div>
  );
}

export default withLayout(Donation);
