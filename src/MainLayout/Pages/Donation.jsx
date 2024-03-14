import React from "react";
import withLayout from "..";
import Banner from "../Components/Banner";
import DonationBanner from "../../assets/donate-banner.jpg";
import DonationBannerMob from "../../assets/donatemob.png";
import DonatePie from "../../assets/donate_pie.gif";
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
          <h5>Do A GOOD DEED</h5>
          <div className="deed-info">
            <div className="info">
              <b> Swarajya</b> has been working in India for the past 2 years ,
              for the upliftment of marginalised women and girls through various
              social programs .
            </div>
            <div className="pie-chart">
              <div className="pie-image">
                <img src={DonatePie} alt="" />
                <h5>93%</h5>
                <div className="pie-desc">
                  <span>
                    93% of all our expenses go to our programme services
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Donate />
      <Contact />
    </div>
  );
}

export default withLayout(Donation);
