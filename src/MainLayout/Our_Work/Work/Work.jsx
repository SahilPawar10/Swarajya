import React from "react";
import "./work.css";
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
      <div className="work-container contenr-1200">
        <div className="work-info">
          <div className="work-info-heading">
            <h4>
              Empowering marginalized girls through quality education and
              leadership skills
            </h4>
          </div>
          <div className="work-info-text">
            <p>
              Our girls education programmes and projects in India work through
              building learning ecosystems that are inclusive, gender conscious,
              and safe for all. We work with various stakeholders to champion
              the importance of girl child education and mobilize resources
              through online donations in India and other strategies. Our
              education initiatives work in accordance with the Right to
              Education Act (2009) and National Education Policy 2020.
            </p>
            <p>
              CARE India’s ‘Girl Education Program’ (GEP) has been working for
              25 years to ensure quality elementary education for children,
              especially girls and those from marginalized communities, to help
              them become the leaders and changemakers of the future. We see
              education as an imperative tool for girls to realize their maximum
              potential by gaining crucial skills and dispositions that set them
              on the path of social and economic empowerment.
            </p>
          </div>
        </div>
        {/* -----------------------section2-------------------------- */}
        <div className="work-section2">
          <div className="part-1">
            <div className="block">
              <h2>Strong Foundation</h2>
              <p>
                Align with FLN Mission and Universalization of Early Childhood
                Care Education objective of NEP
              </p>
            </div>
            <p className="block-goal">
              Goal : Build pathways that bring student to school and ensure
              students learn at schools
            </p>
          </div>
          <div className="part-2">
            <div className="block">
              <h2>Innovators and Change Maker</h2>
              <p>
                Align with NEPs objective of developing 21st Century skills in
                adolescents
              </p>
            </div>
            <p className="block-goal">
              Goal : Build pathways that bring student to school and ensure
              students learn at schools
            </p>
          </div>
        </div>
        {/* --------------------------------------section 3------------------------------ */}
        <div className="work-poster">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export default withLayout(Work);
