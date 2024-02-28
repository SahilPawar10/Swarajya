import React from "react";
import Banner from "../Components/Banner";
import withLayout from "..";
import involved_Image from "../../assets/involved_banner.jpg";
import involved_Image_mob from "../../assets/involved_bannermob.jpg";

function Get_Involved() {
  return (
    <div>
      {" "}
      <Banner
        image={involved_Image}
        mob_image={involved_Image_mob}
        submenu1={""}
        submenu2={"Get Involved"}
      />
    </div>
  );
}

export default withLayout(Get_Involved);
