import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getVisitor } from "../../api/apiService";
import "./visitor.css";

function Visitors() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getVisitor()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div id="visitors">
      <div className="search-bar">
        <input type="text" placeholder="Search Here" />
        <button>
          <span>Search</span>
        </button>
      </div>
      {/* Table */}
      <div className="visitor-table">
        <table>
          <thead>
            <tr>
              <th className="visitortable-heading">Sr.no</th>
              <th className="visitortable-heading">Name</th>
              <th className="visitortable-heading">Number</th>
              <th className="visitortable-heading">Email</th>
              <th className="visitortable-heading">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((visitor, index) => (
              <tr key={index}>
                <td data-label="Sr.no">{index + 1}</td>
                <td data-label="Name">{visitor.name}</td>
                <td data-label="Number">{visitor.number}</td>
                <td data-label="Email">{visitor.email}</td>
                <td data-label="Action">
                  <button>Approve</button>
                  <button>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LayoutAdmin(Visitors, "visit");
