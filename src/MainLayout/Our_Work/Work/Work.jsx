import React from "react";
import Banner from "../../Components/Banner";
import withLayout from "../..";
import workBanner from "../../../assets/work_Banner.jpg";
import workBanner_mob from "../../../assets/work_Bannermob.jpg";

function Work() {
  return (
    <div>
      <Banner
        image={workBanner}
        mob_image={workBanner_mob}
        submenu1={"Our Works"}
        submenu2={"Our Works"}
      />
    </div>
  );
}

export default withLayout(Work);
