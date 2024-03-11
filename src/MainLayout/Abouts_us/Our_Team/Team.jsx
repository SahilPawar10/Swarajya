import React, { useState } from "react";
import Banner from "../../Components/Banner";
import "./team.css";
import teamPhoto from "../../../assets/rsz_2bhajani_mandal1.jpg";
import teamPhoto_mob from "../../../assets/bhajani_mandal1_mob.jpg";
import member1 from "../../../assets/member2 (2).jpeg";
import member2 from "../../../assets/member3.jpeg";
import member3 from "../../../assets/member4.jpeg";
import member4 from "../../../assets/member5.jpeg";
import member5 from "../../../assets/member6.jpeg";
import member6 from "../../../assets/member7.jpeg";
import Mgtmember1 from "../../../assets/dattta.jpeg";
import Mgtmember2 from "../../../assets/mgtmember2.jpg";
import Mgtmember3 from "../../../assets/mgtmember3.jpg.png";
import Mgtmember4 from "../../../assets/mgtmember4.jpg.png";
import Mgtmember5 from "../../../assets/mgtmember5.jpg.png";
import Mgtmember6 from "../../../assets/mgtmember7.jpeg";

import withLayout from "../..";

const teamData = [
  {
    id: "1",
    image: member1,
    name: "Vikas Pawar",
    role: "Chairman",
  },
  {
    id: "2",
    image: member3,
    name: "Dipak Pawar",
    role: "Director",
  },
  {
    id: "3",
    image: member5,
    name: "Sahil Pawar",
    role: "Director",
  },
  {
    id: "4",
    image: member6,
    name: "Ajit Kadam",
    role: "Director",
  },
  {
    id: "5",
    image: member4,
    name: "Rupesh Kadam ",
    role: "Director",
  },
  {
    id: "6",
    image: member2,
    name: "Vishal Nikam",
    role: "Director",
  },
];
const teamDataMgt = [
  {
    id: "1",
    image: Mgtmember6,
    name: "Rohan  Chavhan",
    role: "Management Member",
  },
  {
    id: "2",
    image: Mgtmember1,
    name: "Datta Pawar",
    role: "Management Member",
  },
  {
    id: "3",
    image: Mgtmember2,
    name: "Swapnil Kadam",
    role: "Management Member",
  },
  {
    id: "4",
    image: Mgtmember3,
    name: "Narendra Kadam",
    role: "Management Member",
  },
  {
    id: "5",
    image: Mgtmember4,
    name: "Vishal PAwar ",
    role: "Management Member",
  },
  {
    id: "6",
    image: Mgtmember5,
    name: "Amar Pawar",
    role: "Management Member",
  },
];

function Team() {
  const [Active, setActive] = useState(false);

  const handleTeam = () => {
    setActive(!Active);
    console.log(Active, "teamActive");
  };
  return (
    <div>
      <Banner
        image={teamPhoto}
        mob_image={teamPhoto_mob}
        submenu1={"About Us"}
        submenu2={"Our Team "}
      />
      <div className="team-container ">
        <div className="team-nav padd-28">
          <ul>
            <li
              className={!Active ? "active-team" : "notActive"}
              onClick={handleTeam}
            >
              <span>Board Members</span>
            </li>
            <li
              className={Active ? "active-team" : "notActive"}
              onClick={handleTeam}
            >
              <span>Management Team</span>
            </li>
          </ul>
        </div>
      </div>
      {/* ........................Team Types....................... */}
      {Active ? Management() : Board()}
    </div>
  );
}

function Board() {
  return (
    <div>
      <div className="team-type  ">
        <div className="team-desc ">
          <p className="padd-28">
            The Board consists of a group of highly accomplished professionals
            from public, private and development sector who share a common
            passion for empowering women and girls to alleviate poverty and
            reduce social exclusion. The board chaired by Mr. Mathew Cherian
            provides governance and leadership for enabling Swarajya India
            accomplish its mission. The board is actively engaged in governing
            Swarajya as a lead development institution in the country working in
            close collaboration with other development partners.
          </p>
        </div>
        <div className="team-members">
          <div className="teamtype-container contenr-1200 ">
            <h2>Board Members</h2>
            <div className="team-grid">
              {teamData.map((item) => {
                return (
                  <div className="team-member">
                    <div className="member-photo">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="member-info">
                      <h4 className="memberName">{item.name}</h4>
                      <p className="memberRole">{item.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Management() {
  return (
    <div>
      <div className="team-type ">
        <div className="team-desc ">
          <p className="padd-28">
            CARE India has a leadership team which is a blend of professionals
            from the private and development sector. They bring a wide range of
            experience to bear upon development challenges and create innovative
            solutions for long term sustainable impact on the ground.
          </p>
        </div>
        <div className="team-members">
          <div className="teamtype-container contenr-1200 ">
            <h2>Management Team</h2>
            <div className="team-grid">
              {teamDataMgt.map((item) => {
                return (
                  <div className="team-member">
                    <div className="member-photo">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="member-info">
                      <h4 className="memberName">{item.name}</h4>
                      <p className="memberRole">{item.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(Team);
