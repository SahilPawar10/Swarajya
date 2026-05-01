import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LayoutAdmin from "../Layout2/LayoutAdmin";
import "../Visitors/visitor.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getUsersData } from "../../slices/acccount.slice";

function AdminHome() {
  // const [team, setTeam] = useState([]);

  const [modalImage, setModalImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const dispatch = useDispatch();

  const team = useSelector((state) => state.accounts.team);

  const closeModal = () => {
    setModalImage(null);
  };

  useEffect(() => {
    if (!team || team.length === 0) {
      dispatch(getUsersData());
    }
  }, [dispatch]);

  const searchValue = appliedSearch || searchTerm;
  const filteredTeam = team.filter((member) => {
    const haystack = [
      member.firstName,
      member.lastName,
      member.number,
      member.email,
      member.gender,
      member.address,
      member.currentShare,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(searchValue.trim().toLowerCase());
  });

  const handleSearch = (event) => {
    event.preventDefault();
    setAppliedSearch(searchTerm);
  };

  return (
    <div id="adminHome">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search members by name, email, number..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setAppliedSearch("");
          }}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
      <div className="visitor-table">
        <table>
          <thead>
            <tr>
              <th className="visitortable-heading-heading">Sr.no</th>
              <th className="visitortable-heading-heading">Name</th>
              <th className="visitortable-heading-heading">Number</th>
              <th className="visitortable-heading-heading">Email</th>
              <th className="visitortable-heading-heading">Gender</th>
              <th className="visitortable-heading-heading">Picture</th>
              <th className="visitortable-heading-heading">Address</th>
              <th className="visitortable-heading-heading">Share</th>
              <th className="visitortable-heading-heading">Active Since</th>
              <th className="visitortable-heading-heading">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeam.map((team, index) => (
              <tr key={team.id || team._id || index}>
                <td>{index + 1}</td>
                <td>{team.firstName + " " + team.lastName} </td>
                <td>{team.number}</td>
                <td>{team.email}</td>
                <td>{team?.gender ? team.gender : "not updated"}</td>
                <td>
                  {team?.picturePath ? (
                    <div className="hover-image-wrapper">
                      <img
                        src={team.picturePath}
                        alt="thumb"
                        className="thumbnail"
                      />
                      <div className="hover-modal">
                        <img src={team.picturePath} alt="enlarged" />
                      </div>
                    </div>
                  ) : (
                    "not updated"
                  )}
                </td>

                <td>{team?.address ? team.address : "not updated"}</td>
                <td>{team.currentShare}%</td>
                <td>
                  {" "}
                  {new Date(team.activeSince).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <MoreVertIcon sx={{ transform: "rotate(0deg)" }} />
                </td>
              </tr>
            ))}
            {filteredTeam.length === 0 && (
              <tr>
                <td colSpan="10">No members found.</td>
              </tr>
            )}
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

      {/* Modal */}
      {modalImage && (
        <div className="image-modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img src={modalImage} alt="Full view" className="modal-content" />
        </div>
      )}
    </div>
  );
}

export default LayoutAdmin(AdminHome, "admin-home");
