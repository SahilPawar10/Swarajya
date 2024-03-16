import React from "react";
import withLayout from "..";
import "./pages.css";
import Banner from "../Components/Banner";
import foundingBg from "../../assets/foundingStory.jpg";
import foundingBg_Mob from "../../assets/foundigStory_Mob.jpg";
import moments from "../../assets/moments.jpg";
import { Link } from "react-router-dom";
function FoundingStory() {
  return (
    <div>
      <Banner
        image={foundingBg}
        mob_image={foundingBg_Mob}
        submenu1={""}
        submenu2={"Founding Story"}
      />
      <div className="contenr-1200">
        <div className="swarajya-moments">
          <div className="img">
            <img src={moments} alt="" />
          </div>
          <div className="moments-info">
            <h5>Swarajya (2021-Present )</h5>
            <h3>Our Founding Story </h3>
            <p>
              May 12 , 1949. Berlin, Germany. When Soviet troops blockaded
              Berlin in 1948, the first major crisis of the Cold War ensued. The
              US responded with the now famous airlift, which included 250,000
              CARE packages, 60 per cent of all relief sent to the city. More
              than seven decades ago, CARE was established by 22 charities to
              send CARE Packages® of food, clothing, medicine and other relief
              supplies to the survivors of World War II in Europe and Asia after
              the war. In delivering this aid, the humanitarian organisation
              faced challenges of limited resources, an unreliable postal
              system, high shipping costs and poor transportation services.
            </p>
            <div className="moment-btn">
              <Link to="/donation" className="read-more">
                Donate{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(FoundingStory);
