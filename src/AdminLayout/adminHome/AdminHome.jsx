import React, { useState, useEffect } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getTeamData } from "../../api/apiService";

function AdminHome() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getTeamData()
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <div id="adminHome">
      <div className="search-bar">
        <input type="text" placeholder="Search Here" />
        <button>
          <span>Search</span>
        </button>
      </div>
      <div className="team-table">
        <table>
          <thead>
            <tr>
              <th className="teamtable-heading">Sr.no</th>
              <th className="teamtable-heading">Name</th>
              <th className="teamtable-heading">Number</th>
              <th className="teamtable-heading">Email</th>
              <th className="teamtable-heading">Gender</th>
              <th className="teamtable-heading">Picture</th>
              <th className="teamtable-heading">Address</th>
              <th className="teamtable-heading">Action</th>
            </tr>
          </thead>
          <tbody>
            {team.map((team, index) => (
              <tr id={index}>
                <td>{index + 1}</td>
                <td>{team.firstName + " " + team.lastName} </td>
                <td>{team.number}</td>
                <td>{team.email}</td>
                <td>{team?.gender ? team.gender : "not updated"}</td>
                <td>{team?.picturePath ?  <img src={team.picturePath} alt="" />  : "not updated"}</td>
                <td>{team?.address ? team.address : "not updated"}</td>
                <td>
                  <MoreVertIcon sx={{ transform: "rotate(0deg)" }} />
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>1</td>
              <td>Sahil Pawar</td>
              <td>9764804327</td>
              <td>sahilpawar@gmail.com</td>
              <td>Male</td>
              <td>Picture</td>
              <td>At post Ambrag tal-patan</td>
              <td>
                <MoreVertIcon sx={{ transform: "rotate(0deg)" }} />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Sahil Pawar</td>
              <td>9764804327</td>
              <td>sahilpawar@gmail.com</td>
              <td>Male</td>
              <td>Picture</td>
              <td>At post Ambrag tal-patan</td>
           
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LayoutAdmin(AdminHome, "admin-home");
