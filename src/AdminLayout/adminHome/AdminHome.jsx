import React, { useState, useEffect } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getTeamData } from "../../api/apiService";

function AdminHome() {
  const [team, setTeam] = useState([]);

  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

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
              <th className="visitortable-heading-heading">Action</th>
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
