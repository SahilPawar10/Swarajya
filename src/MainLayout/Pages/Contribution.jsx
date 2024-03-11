import React from "react";
import "./pages.css";
import Banner from "../Components/Banner";
import withLayout from "..";
import HighValueBanner from "../../assets/high-value_banner.jpg";
import highValuemob from "../../assets/high-value.jpg";
import highValuemodel1 from "../../assets/Send-Girls-Back-to-School.svg";
import highValuemodel2 from "../../assets/Education-01-1.svg";
import highValuemodel3 from "../../assets/Goal-2.svg";
import highValuemodel4 from "../../assets/Childrens-Libraries-2.svg";
import highValuemodel5 from "../../assets/Building-the-Infrastructure-to-Ideation-Innovate-Build-Future.svg";
import highValuemodel6 from "../../assets/Goal-7.svg";
import highValuemodel7 from "../../assets/Help-us-Bring-Education-to-Every-Doorstep.svg";
import highValuemodel8 from "../../assets/Empowering-Children-with-STEM-Education-in-Rural-India.svg";
import highValuemodel9 from "../../assets/Goal-10.svg";
// import highValuemodel10 from "../../assets/";

function Contribution() {
  return (
    <div>
      {/* Section1 */}
      <Banner
        image={HighValueBanner}
        mob_image={highValuemob}
        submenu1={"High Value Contribution"}
        submenu2={"About Us "}
      />
      {/* ---------------------------Section2---------------------------- */}
      <div className="contenr-1200">
        <div className="section2-highval">
          <p>
            As a High-Earning Member of the society, your generous and
            distinguished contributions have helped us meet our goals of
            bringing positive changes in the lives of those marginalised
            communities, who are not as empowered as the rest of us.
          </p>
          <p>
            Yet again, we look forward to your continued support, that help us
            meet our targets faster.
          </p>
          <p>
            Thank you for making our campaigns such a success and bringing
            smiles on the faces of uncountable individuals.
          </p>
          <div className="highval-imges">
            <div className="highval-grid">
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel1} alt="" />
                </div>
                <div className="box-line">Send Girls Back to School</div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box2----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel2} alt="" />
                </div>
                <div className="box-line">Help Provide Quality Education</div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box3----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel3} alt="" />
                </div>
                <div className="box-line">
                  Ensure Quality Healthcare for Children
                </div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box4----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel4} alt="" />
                </div>
                <div className="box-line">
                  Children’s Libraries: Cultivating a Love of Reading
                </div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box5----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel5} alt="" />
                </div>
                <div className="box-line">
                  Building the Infrastructure to Ideation, Innovate & Build
                  Future
                </div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------bo62----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel6} alt="" />
                </div>
                <div className="box-line">
                  Empower Adolescent Girls, Shape a Brighter Future
                </div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box7----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel6} alt="" />
                </div>
                <div className="box-line">
                  Ignite the Joy of Learning: Empower Rural Children with
                  Play-Based Education
                </div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box8----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel7} alt="" />
                </div>
                <div className="box-line">
                  Help us bring education to every doorstep
                </div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box9----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel8} alt="" />
                </div>
                <div className="box-line">
                  Empowering children with STEM education in rural India
                </div>
                <div className="box-btn">DONATE</div>
              </div>
              {/* ------------box10----------------- */}
              <div className="highval-box">
                <div className="img">
                  <img src={highValuemodel9} alt="" />
                </div>
                <div className="box-line">
                  Invest in a Greener Future for Our Children
                </div>
                <div className="box-btn">DONATE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(Contribution);
