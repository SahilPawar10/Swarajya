import React, { useState, useEffect } from "react";
import "./profile.css";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import profileImg from "../../assets/logo1.jpg";
import { Link } from "react-router-dom";
import { getOneUser, updateUser } from "../../api/apiService";
import ProfileChangeDialog from './ProfileChangeDialog'

function Profile() {
  const [edit, setedit] = useState(false);
  const [userData, setUserData] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    
    setIsDialogOpen(false);
    setUser()
  };

  const [editData, setEditData] = useState();

  const clickToEdit = () => {
    setedit(!edit);
  };

  const setUser = ()=>{
    const id = localStorage.getItem("userId");
    if (id) {
      getOneUser(id)
        .then((res) => {
          setUserData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    console.log("EseEffect");
  }
  useEffect(() => {
    setUser()
  }, [isDialogOpen]);

  const handleform = async () => {
    console.log(editData);
    updateUser(userData.id, editData)
      .then((res) => {
        console.log(res);
        alert("Succesfuly Updated ..!");
      })
      .catch((err) => console.log(err));
  };
  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div id="profile">
      <div className="profile-tab">
        <div className="profile-left-tab">
          <div className="profile-left-tab-innner">
            <div className="profile-img">
              {userData.picturePath ?
              <img src={userData.picturePath} alt="" /> 
              :<img src={profileImg} alt="" /> }
          
            </div>
              {userData.firstName ? <h4>{ userData?.firstName + " " + userData?.lastName }</h4> : <h4>Swarajya</h4>}
                
             {/* <h4>{userData?.firstName ? userData?.firstName:'Loading' + " " + userData.lastName} </h4> */}
            {/* <h6>Since 14,feb,2024</h6> */}
            <div className="profile-btns">
              <div  onClick={handleOpenDialog}>Change Profile</div>
              <ProfileChangeDialog isOpen={isDialogOpen} onClose={handleCloseDialog} profileId={userData.id}/>
              <div>
                <Link to="/forgot_password">Reset Password</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-right-tab">
          <h6>Profile Details</h6>

          <div className="profile-form">
            <div class="form-group">
              <label for="inputName">First Name</label>
              {edit ? (
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  name="firstName"
                  onChange={onChange}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  value={userData?.firstName}
                />
              )}
              {/* <input type="text" class="form-control" id="inputName" /> */}
            </div>
            <div class="form-group">
              <label for="inputName">Last Name</label>
              {edit ? (
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  name="lastName"
                  onChange={onChange}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  value={userData?.lastName}
                />
              )}
              {/* <input type="text" class="form-control" id="inputName" /> */}
            </div>
            <div class="form-group">
              <label for="inputEmail">Email</label>
              {edit ? (
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  name="email"
                  onChange={onChange}
                />
              ) : (
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  value={userData?.email}
                />
              )}
            </div>
            <div class="form-group">
              <label for="Mobile">Mobile</label>
              {edit ? (
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  name="number"
                  onChange={onChange}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  value={userData?.number}
                />
              )}
            </div>
            <div class="form-group">
              <label for="Gender">Gender</label>
              {edit ? (
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  name="gender"
                  onChange={onChange}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  value={userData?.gender}
                />
              )}
            </div>
            <div class="form-group">
              <label for="Address">Address</label>
              {edit ? (
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  name="address"
                  onChange={onChange}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  value={userData?.address}
                />
              )}
            </div>
            {/* <div class="form-group"> */}
            {/* <label for="inputName">Change Photo</label>
              <input type="file" class="form-control" id="inputName" /> */}
            {/* </div> */}
            <div class="form-group-btn">
              <button className="edit-profile-tab" onClick={clickToEdit}>
                {edit ? "Reset" : "Edit Details"}
              </button>
              <button className="edit-profile-tab" onClick={handleform}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin(Profile, "Profile");
