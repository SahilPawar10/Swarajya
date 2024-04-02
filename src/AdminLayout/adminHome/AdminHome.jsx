import React from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function AdminHome() {
  return (
    <div>
      {/* search bar  */}
      <div className="search-bar">
        <input type="text" placeholder="Search Here" />
      </div>
      {/* Table */}
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
            <tr>
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
              <td>
                <MoreVertIcon sx={{ transform: "rotate(0deg)" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LayoutAdmin(AdminHome, "admin-home");
