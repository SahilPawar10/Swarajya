import React from "react";
import Banner from "../../Components/Banner";
import withLayout from "../..";
import healthBanner from "../../../assets/health-banner.jpg";
import healthBanner_mob from "../../../assets/health-bannermob.jpg";
function Health() {
  return (
    <div>
      <Banner
        image={healthBanner}
        mob_image={healthBanner_mob}
        submenu1={"Our Works"}
        submenu2={"Health"}
      />
    </div>
  );
}

export default withLayout(Health);
