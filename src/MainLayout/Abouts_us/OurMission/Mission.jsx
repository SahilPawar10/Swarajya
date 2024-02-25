import React from "react";
import withLayout from "../..";
import "./mission.css";
import missionBanner from "../../../assets/visionmission_banner.jpg";
import tablebg from "../../../assets/cirle-motiff.svg";

const Mission = () => {
  return (
    <div className="mission-section">
      <div className="mission-banner">
        <img src={missionBanner} alt="" />
        <div className="front-view-container">
          <div className="row">
            <div className="insider-header">
              <div className="front-view-inside">
                <div className="small-nav">
                  <p> Home > Who we are > Vision and Mission</p>
                </div>
                <div className="misson-header">
                  <div className="mision-header-text">
                    <h4>Vision and Mission</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-desc-container">
        <div className="row">
          <div className="insider">
            <div className="mission-desc-text">
              <div className="col-main">
                <div className="heading">Our Vision</div>
                <div className="heading-text">
                  <p>
                    We seek a world of hope that is inclusive and just, where
                    all people live in dignity and security.
                  </p>
                </div>
              </div>
              <div className="col-main">
                <div className="heading">Our Vision</div>
                <div className="heading-text">
                  <p>
                    We seek a world of hope that is inclusive and just, where
                    all people live in dignity and security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-bg">
        <img src={tablebg} alt="" />

        {/* <h1>Welcome</h1> */}

        {/* ....................................Table ............................ */}
      </div>
      <div className="table-container">
        <div className="table-inner">
          <table className="actual-table">
            <thead className="t-head">
              <tr>
                <th className="left-th">Thematic Goals</th>
                <th className="right-th">
                  <h6> Vertical Technical Focus</h6>
                  <table className="right-th-table">
                    <tbody>
                      <tr className="right-th-tr">
                        <th className="right-th-tr-th">Health</th>
                        <th className="right-th-tr-th">Livelihood</th>
                        <th className="right-th-tr-th">Education</th>
                        <th className="right-th-tr-th">Community</th>
                      </tr>
                    </tbody>
                  </table>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-rows-1">
                  <table className="table-rows">
                    <tbody>
                      <tr className="table-rows-tr">
                        <td className="border-0">
                          {" "}
                          Humanitarian action (SDG 11)
                        </td>
                      </tr>
                      <tr className="table-rows-tr">
                        <td className="border-0">
                          {" "}
                          Quality healthSWARAJYA (SDG 3)
                        </td>
                      </tr>
                      <tr className="table-rows-tr">
                        <td className="border-0">
                          Quality and inclusive education (SDG 4)
                        </td>
                      </tr>
                      <tr className="table-rows-tr">
                        <td className="border-0">
                          Decent work and economic growth (SDG 8)
                        </td>
                      </tr>
                      <tr className="table-rows-tr">
                        <td className="border-0">
                          Adequate food and nutrition (SDG 2)
                        </td>
                      </tr>
                      <tr className="table-rows-tr">
                        <td className="border-0">
                          Clean water and sanitation (SDG 6)
                        </td>
                      </tr>
                      <tr className="table-rows-tr">
                        <td className="border-0">
                          Clean energy, climate resilience (SDG 7, 13)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="table-rows-right">
                    <tbody>
                      <tr className="table-rows-right-tr">
                        <td className="box1"></td>
                        <td className="box"></td>
                        <td className="box"></td>
                        <td className="box check-icon">
                          <i class="fa fa-check" aria-hidden="true"></i>{" "}
                        </td>
                      </tr>
                      <tr className="table-rows-right-tr">
                        <td className="box1 check-icon">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box"></td>
                        <td className="box"></td>
                        <td className="box"> </td>
                      </tr>
                      <tr className="table-rows-right-tr">
                        <td className="box1"></td>
                        <td className="box"></td>
                        <td className="box check-icon">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box"> </td>
                      </tr>
                      <tr className="table-rows-right-tr">
                        <td className="box1"></td>
                        <td className="box2 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box3"></td>
                        <td className="box4"> </td>
                      </tr>
                      <tr className="table-rows-right-tr">
                        <td className="box1 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box2 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box3 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box4 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>{" "}
                        </td>
                      </tr>
                      <tr className="table-rows-right-tr">
                        <td className="box1 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box2 check-icon">
                          {" "}
                          <i
                            class="fa fa-check check-icon"
                            aria-hidden="true"
                          ></i>
                        </td>
                        <td className="box3"></td>
                        <td className="box4 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>{" "}
                        </td>
                      </tr>
                      <tr className="table-rows-right-tr">
                        <td className="box1"></td>
                        <td className="box2 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                        <td className="box3"></td>
                        <td className="box4 check-icon">
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ....................................Our Difference ............................ */}
      <div className="swarajy-diff-container">
        <div className="diff-background-img section-background-block"></div>
        <div className="diff-text-box">
          <div className="diff-text-row">
            <h2 className="padding-20"> The SWARAJYA Difference</h2>
            <p className="padding-20">
              SWARAJYA focuses on large scale interventions that build
              communities that are capable of empowering women and girls.
            </p>
            <p className="padding-20">
              Women have long-endured familial, communal, societal, and economic
              discrimination. We put women and girls at the heart of all our
              work because we know that we cannot overcome poverty without
              fighting inequality. In a just and inclusive world, each
              individual must have equal rights and opportunities.
            </p>
            <p className="last-text-diff padding-20">
              When we invest in women and girls, we invest in strengthening
              their families and communities.
            </p>
          </div>
        </div>
      </div>
      {/* ....................................Mission Programms ............................ */}
      <div className="mission-programs-container">Mission Programs</div>
      <div className="mission-image-with-text">Mission Image with text</div>
    </div>
  );
};

export default withLayout(Mission);
