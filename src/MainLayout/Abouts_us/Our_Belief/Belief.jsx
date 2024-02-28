import React from "react";
import withLayout from "../..";
import Banner from "../../Components/Banner";
import beliefBanner from "../../../assets/our_beliefBanner.png";
import beliefBanner_mob from "../../../assets/our_beliefBannermob.png";

function Belief() {
  return (
    <div>
      <Banner
        image={beliefBanner}
        mob_image={beliefBanner_mob}
        submenu1={"About Us"}
        submenu2={"Our Belief "}
      />
    </div>
  );
}

// export default Belief;
export default withLayout(Belief);
