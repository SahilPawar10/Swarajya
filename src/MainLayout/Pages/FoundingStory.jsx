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
              It all started with a Dream . A dream that everyone saw together .
              The origin of this started from a ShivJayanti . but its not limited to that only . 
              we choose to work further for wellness of people . We are working for every possible
              thing that will bring happiness and development among our people .
              We are taking actions to help the needy , not in bigger scale but 
              whatever possible for us we are doing it . wo bhi badhega but hole hole.
              Its just starting , we will convert our little steps into bigger once .
              <br/>
              Our primary focus is our people . We want to work for better future for
              our people . To do this work , we want a string that holds all us together
              Thats why the Idea of Swarajya came . i.e to work for our people , from our people .
              Every Swarajya member contributing 1% of their earnings .We know that is enough to
              bring the changes we want . Now , the list is small but in future there will a presentable 
              list .

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
