import React from "react";
import "./work.css";
import Banner from "../../Components/Banner";
import withLayout from "../..";
import workBanner from "../../../assets/work_Banner.jpg";
import workBanner_mob from "../../../assets/work_Bannermob.jpg";
import workPoster from "../../../assets/infographic.png";
import workBlog1 from "../../../assets/workblog1.jpg";
import workBlog2 from "../../../assets/workblog2.jpg";
import workBlog3 from "../../../assets/workblog3.jpg";
import workBlog4 from "../../../assets/workblog4.png";
import { Link } from "react-router-dom";

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
          <img src={workPoster} alt="" />
        </div>
        {/*----------------------------------- Touching Lives---------------------------------------- */}
        <div className="touching-lives contenr-1200">
          <h2>Touching Lives</h2>
          <div className="blogs">
            <div className="blog">
              <div className="blog-image">
                <img src={workBlog1} alt="" />
              </div>
              <div className="blog-desc">
                <div className="blog-type">EDUCATION</div>
                <div className="blog-header">
                  <h4>
                    Giving Girls a Newfound Confidence to Realise their Dreams
                    with Ballika Manch
                  </h4>
                </div>
                <div className="blog-story">
                  <p>
                    Fifteen-year-old Sabrina is a class VIII student in the
                    government middle school at Bawla, Haryana. She studies all
                    subjects diligently, with her favourite being Hindi. During
                    the COVID pandemic, she missed school for two years due to
                    the lockdown restrictions, a time...
                  </p>
                </div>
                <div>
                  <Link className="read-more">Read More</Link>
                </div>
              </div>
            </div>
            <div className="blog">
              <div className="blog-image">
                <img src={workBlog2} alt="" />
              </div>
              <div className="blog-desc">
                <div className="blog-type">HEALTH</div>
                <div className="blog-header">
                  <h4>
                    Powering Up For Better Irrigation: The Green Revolution in
                    Pinjrat Village
                  </h4>
                </div>
                <div className="blog-story">
                  <p>
                    In the heart of Surat district, nestled amidst the verdant
                    landscapes, lies the village of Pinjrat. Home to 86
                    families, this village is located next to a water stream,
                    with its inhabitants primarily depending on agriculture for
                    their livelihood. For years, they relied on a diesel-powered
                    irrigation...
                  </p>
                </div>
                <div className="blog-read-more">
                  <Link className="read-more">Read More</Link>
                </div>
              </div>
            </div>
            <div className="blog">
              <div className="blog-image">
                <img src={workBlog3} alt="" />
              </div>
              <div className="blog-desc">
                <div className="blog-type">WOMEN EMPOWERMENT</div>
                <div className="blog-header">
                  <h4>Building businesses, Empowering women</h4>
                </div>
                <div className="blog-story">
                  <p>
                    Healthy living along with sustainable livelihoods is key to
                    changing the destiny of many poor and marginalised women in
                    the remotest parts of our country. This builds their
                    resilience to meet life’s challenges head on and provides a
                    strong foundation to take care of themselves, according to
                    'The State of Food Security and Nutrition in the World,their
                    family and th...
                  </p>
                </div>
                <div className="blog-read-more">
                  <Link className="read-more">Read More</Link>
                </div>
              </div>
            </div>
            <div className="blog">
              <div className="blog-image">
                <img src={workBlog4} alt="" />
              </div>
              <div className="blog-desc">
                <div className="blog-type">LIVELIHOOD</div>
                <div className="blog-header">
                  <h4>Healthy communities start right nutrition</h4>
                </div>
                <div className="blog-story">
                  <p>
                    14 percent of India’s population is undernourished,
                    according to 'The State of Food Security and Nutrition in
                    the World, 2020’ report. CARE India’s Kanya Sampurna Project
                    is makithe World, 2020’ report. CARE India’s Kanya Sampurna
                    Project is maki according to 'The State of Food Security and
                    Nutrition in the World...
                  </p>
                </div>
                <div className="blog-read-more">
                  <Link className="read-more">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(Work);
