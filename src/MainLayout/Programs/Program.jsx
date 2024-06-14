import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./program.css";
import program1 from "../../assets/snapedit_1700113471687.png";
import slider2 from "../../assets/snapedit_1700113658178.png";
import slider3 from "../../assets/WhatsApp Image 2023-11-11 at 11.12.22 PM.jpeg";
import slider4 from "../../assets/WhatsApp Image 2023-11-16 at 10.59.42 AM.jpeg";

function Program() {
  let count = 1;
  useEffect(() => {
    const intervalID = setInterval(() => {
      document.getElementById("redio" + count).checked = true;
      ++count;
      if (count > 4) {
        count = 1;
      }
    }, 4500);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div id="programs">
      <section className="section">
        <div className="slider">
          <div className="slide">
            <input type="radio" name="redio-btn" id="redio1" />
            <input type="radio" name="redio-btn" id="redio2" />
            <input type="radio" name="redio-btn" id="redio3" />
            <input type="radio" name="redio-btn" id="redio4" />
            <div className="st first">
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    <div class="circle_box">
                      <div>
                        <svg>
                          <circle cx="170" cy="170" r="160" />
                          <circle cx="170" cy="170" r="160" />
                        </svg>
                        <span>
                          <img src={program1} loading="lazy" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2>Empowering Women, Empowering Society.</h2>
                  </div>
                  <p className="slide-desc">
                    While India’s economy has grown well, the country has the
                    highest number of stunted children in the world (40.6
                    million). India is home to one-third of the global total of
                    stunted children under the age of five.
                  </p>

                  <Link to="/donation" className="program-button">
                    <span className="text">Donate Us</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="st">
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    <div class="circle_box">
                      <div>
                        <svg>
                          <circle cx="170" cy="170" r="160" />
                          <circle cx="170" cy="170" r="160" />
                        </svg>
                        <span>
                          <img src={slider2} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2> Lighting the Path to Knowledge for Every Child</h2>
                  </div>
                  <p className="slide-desc">
                    Embark on the transformative journey of education with our
                    commitment to every child's bright future.we believe in
                    illuminating the path to knowledge, empowering each young
                    mind to shine brightly
                  </p>

                  <Link to="/donation" className="program-button">
                    <span className="text">Donate Us</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="st">
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    <div class="circle_box">
                      <div>
                        <svg>
                          <circle cx="170" cy="170" r="160" />
                          <circle cx="170" cy="170" r="160" />
                        </svg>
                        <span>
                          <img src={slider3} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2>
                      Shiv Jayanti: A Celebration of Strength, Compassion, and
                      Self-Realization
                    </h2>
                  </div>
                  <p className="slide-desc">
                    Step into the divine realm as we celebrate Shiv Jayanti,
                    honoring the birth of Lord Shiva. captivating cultural
                    performances, and insightful discussions on the profound
                    teachings of Shiva.
                  </p>

                  <Link to="/donation" className="program-button">
                    <span className="text">Donate Us</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="st">
              <div class="program-slide ">
                <div class="col">
                  <div className="image-section">
                    {/* <img src={program1} alt="carosou1" /> */}
                    <div class="circle_box">
                      <div>
                        <svg>
                          <circle cx="170" cy="170" r="160" />
                          <circle cx="170" cy="170" r="160" />
                        </svg>
                        <span>
                          <img src={slider4} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col img-desc ">
                  <div className="slide-title">
                    <h2>
                      Discover Wisdom Through Melody: Knowledge Via Kirtans
                    </h2>
                  </div>
                  <p className="slide-desc">
                    These devotional chants not only uplift the spirit but also
                    serve as a conduit for timeless teachings.where the power of
                    sound enlightens minds and opens hearts to the vast
                    reservoir of wisdom embedded Kirtans.
                  </p>
                  {/* <div className="button">Donate</div> */}

                  <Link to="/donation" className="program-button">
                    <span className="text">Donate Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Program;
