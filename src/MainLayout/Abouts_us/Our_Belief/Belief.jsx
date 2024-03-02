import React from "react";
import withLayout from "../..";
import "./belief.css";
import Banner from "../../Components/Banner";
import beliefBanner from "../../../assets/our_beliefBanner.png";
import beliefBanner_mob from "../../../assets/our_beliefBannermob.png";
import grid1 from "../../../assets/We-believe-in-children-150x150.png";
import grid2 from "../../../assets/All-human-beings.png";
import grid3 from "../../../assets/We-are-in-solidarity-.png";
import grid4 from "../../../assets/grid-4.png";
import grid5 from "../../../assets/We-believe-in-collaboration.png";
import grid6 from "../../../assets/We-believe-in-children-150x150.png";
import grid7 from "../../../assets/We-believe-in-giving-each-other-the-.png";
import grid8 from "../../../assets/We-believe-that-all-of-us-are-a.png";

function Belief() {
  return (
    <div>
      <Banner
        image={beliefBanner}
        mob_image={beliefBanner_mob}
        submenu1={"About Us"}
        submenu2={"Our Belief "}
      />
      <div className="belief-container">
        <div className="belief-heading contenr-1200">
          <h2>
            Injustice anywhere is a threat to justice everywhere.” - Martin
            Luther King Jr.
          </h2>
        </div>
        <div className="belief-content contenr-1200">
          <h2>Our Belief</h2>
          <div className="beliefs-grid">
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid1} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  We believe in children. We believe in their right to be heard
                  and participate in decisions that affect them.
                </p>
              </div>
            </div>
            {/*---------------------------2--------------------- */}
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid2} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  All human beings on our planet regardless of geography,
                  religious orientation, skin color, gender, or sexual
                  orientation, are of equal value.
                </p>
              </div>
            </div>
            {/*---------------------------3--------------------- */}
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid3} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  We are in solidarity with peaceful movements to prevent the
                  marginalization of human beings everywhere.
                </p>
              </div>
            </div>
            {/*---------------------------4--------------------- */}
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid4} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  All children, regardless of race, religion, sect, or caste
                  have the same fundamental rights.
                </p>
              </div>
            </div>
            {/*---------------------------5--------------------- */}
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid5} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  We believe in collaboration, inclusion, partnerships, ordinary
                  heroes, honesty, agility, straight talk, and miracles.
                </p>
              </div>
            </div>
            {/*---------------------------6--------------------- */}
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid6} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  We believe in giving each other the benefit of the doubt,
                  leveraging each other’s best skills, listening, learning, and
                  caring deeply about all stakeholders.
                </p>
              </div>
            </div>
            {/*---------------------------7--------------------- */}
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid7} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  All children have the right to grow up in a stable, loving,
                  and nurturing environment.
                </p>
              </div>
            </div>
            {/*---------------------------8--------------------- */}
            <div className="beliefs-points">
              <div className="beliefs-img">
                <img src={grid8} alt="" />
              </div>
              <div className="beliefs-desc">
                <p>
                  We believe that all of us are a stakeholder in the care of the
                  planet and each other the world over.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Belief;
export default withLayout(Belief);
