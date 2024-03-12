import React from "react";
import Banner from "../Components/Banner";
import withLayout from "..";
import "./involved.css";
import involved_Image from "../../assets/involved_banner.jpg";
import involved_Image_mob from "../../assets/involved_bannermob.jpg";
import highValue from "../../assets/high-value.jpg";
import pledgeYour from "../../assets/pledge-your.jpg";
import donate from "../../assets/donate-image.jpg";
import campeign from "../../assets/campaign-image.jpg";
import { Link } from "react-router-dom";
import Contact from "../Components/ContactUS/Contact";

function Get_Involved() {
  return (
    <div>
      <Banner
        image={involved_Image}
        mob_image={involved_Image_mob}
        submenu1={""}
        submenu2={"Get Involved"}
      />
      {/* --------------------------Section1---------------------------------------- */}
      <div className="contenr-1200">
        <div className="involved_Text">
          <div className="header">
            <h4>“Be the change that you want to see”</h4>
            <span>– Mahatma Gandhi</span>
          </div>

          <div className="desc">
            <p>
              Each one of us has the capacity to make a difference and help lend
              a helping hand to the less fortunate around us. Your strong intent
              to make a difference, can take the form of engaging in campaigns
              for the betterment of the society, volunteering and working
              directly with communities, supporting fund raising and monetary
              contributions to the causes of your choice. Be a part of our
              endeavour to work for the marginalised.
            </p>
          </div>
        </div>
      </div>
      {/* -------------------------Section2-------------------------------------- */}
      <div className="involved-attributes contenr-1200">
        <div className="attributes-grid">
          {/* -------------------attribute1------------- */}
          <div className="attribute">
            <div className="attribute-img">
              <img src={highValue} alt="" />
              <div className="img-desc">
                <h4>High Value Contribution</h4>
              </div>
            </div>
            <div className="attribute-content">
              <p>
                <h4>High Value Contribution</h4>
                We deeply value High Net-Worth Individuals like you who feel
                responsible towards the environment around you, and are
                determined to give back to the society from your share of wealth
                and fortunes.
              </p>
              <Link to="/highvalue" className="read-more">
                Read More
              </Link>
            </div>
          </div>
          {/* -------------------attribute2------------- */}
          <div className="attribute">
            <div className="attribute-img">
              <img src={pledgeYour} alt="" />
              <div className="img-desc">
                <h4>Pledge your Support</h4>
              </div>
            </div>
            <div className="attribute-content">
              <p>
                <h4>Pledge your Support</h4>
                Explore our active campaigns and select a cause that you would
                like to associate your voice with as an accountable and
                compassionate protagonist.
              </p>
              <Link to="/support" className="read-more">
                Read More
              </Link>
            </div>
          </div>
          {/* -------------------attribute3------------- */}
          <div className="attribute">
            <div className="attribute-img">
              <img src={donate} alt="" />
              <div className="img-desc">
                <h4>Donate</h4>
              </div>
            </div>
            <div className="attribute-content">
              <p>
                <h4>Donate</h4>
                One of the easiest, fastest, and most effective ways you can
                propel the progress of women and girls is through monetary
                support. . You can easily donate online via net banking, credit
                card and debit card.
              </p>
              <Link to="/donation" className="read-more">
                Read More
              </Link>
            </div>
          </div>
          {/* -------------------attribute4------------- */}
          <div className="attribute">
            <div className="attribute-img">
              <img src={campeign} alt="" />
              <div className="img-desc">
                <h4>Campaigns</h4>
              </div>
            </div>
            <div className="attribute-content">
              <p>
                <h4>Campaigns</h4>
                Over the years, Swarajya has initiated, launched, and organised
                several campaigns to raise the awareness about specific issues
                around women and girl child empowerment.
              </p>
              <Link className="read-more">Read More</Link>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------Section 3---------------------------- */}
      <div className="join-team">
        <div className="contenr-1200">
          <div className="join-team-text">
            <h4>Join Team</h4>
            <p>
              Be part of a team that focuses on developing the potential of
              women and girls to drive long lasting equitable change.
            </p>
            <p>
              Write to us at contactus(at)careindia.org to join the CARE India
              team, as we fight the underlying causes of poverty, build secure
              and flexible communities, and ensure a life of dignity for all
              women and girls from the most deprived and vulnerable communities.
            </p>
            <p>
              <Link className="read-more">Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
      {/* ------------------------Section4-------------------------------- */}
      <Contact />
    </div>
  );
}

export default withLayout(Get_Involved);
