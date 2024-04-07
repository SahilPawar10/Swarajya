import React from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Visitors() {
  return (
    <div id="visitors">
      <div className="search-bar">
        <input type="text" placeholder="Search Here" />
        <button>
          <span>Search</span>
        </button>
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
              <th className="teamtable-heading">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sahil Pawar</td>
              <td>9764804327</td>
              <td>sahilpawar@gmail.com</td>
              <td>
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Sahil Pawar</td>
              <td>9764804327</td>
              <td>sahilpawar@gmail.com</td>
              <td>
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LayoutAdmin(Visitors, "visit");

// align-items: flex-end;
/* justify-content: space-between; */

//   .user-profile {
//   margin: 2% 2% 0 2%;
//   display: flex;
//   align-items: flex-end;

//   width: 90%;
//   padding: 5px;
//   cursor: pointer;
// }

{
  /* <div className="mobile-togle">
              <MenuIcon
                sx={{
                  transform: "rotate(0deg)",
                  fontSize: "2.5rem",
                  color: "#fd7e14",

                  marginTop: "0.2rem",
                }}
              />
            </div> */
}
