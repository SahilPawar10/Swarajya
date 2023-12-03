import React from "react";
import "./recentwork.css";
import recent1 from "../../assets/snapedit_1700113658178.png";

function RecentWork() {
  return (
    <div id="recents">
      <div className="recentInner">
        <div className="recent-image">
          <img src={recent1} alt="" />
        </div>
        <div className="recent-desc">
          <div className="recent-desc-inner">
            <h2>Meet Priya | Case Study</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              labore facilis, dolores consequuntur tenetur fuga, rerum
              laudantium sit expedita, eaque aliquid architecto harum rem
              dolore?
            </p>

            <h3>Read her Story</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentWork;
