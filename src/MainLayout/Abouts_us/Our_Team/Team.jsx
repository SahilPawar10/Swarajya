import React from "react";
import Banner from "../../Components/Banner";
import teamPhoto from "../../../assets/rsz_2bhajani_mandal1.jpg";
import teamPhoto_mob from "../../../assets/bhajani_mandal1_mob.jpg";
import withLayout from "../..";

function Team() {
  return (
    <div>
      <Banner
        image={teamPhoto}
        mob_image={teamPhoto_mob}
        submenu1={"About Us"}
        submenu2={"Our Team "}
      />
    </div>
  );
}

// export default Team;
export default withLayout(Team);
