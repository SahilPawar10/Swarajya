import React from "react";
import Banner from "../../Components/Banner";
import withLayout from "../..";
import jayantiImage from "../../../assets/jayantiBanner.jpeg";

function Jayanti() {
  return (
    <div>
      <Banner
        image={jayantiImage}
        mob_image={jayantiImage}
        submenu1={"Our Works"}
        submenu2={"Shiv Jayanti"}
      />
    </div>
  );
}

export default withLayout(Jayanti);
