import React from "react";
import "./profile.css";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import profileImg from "../../assets/member2 (2).jpeg";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div id="profile">
      <div className="profile-tab">
        <div className="profile-left-tab">
          <div className="profile-left-tab-innner">
            <div className="profile-img">
              <img src={profileImg} alt="" />
            </div>
            <h4>Vikas Pawar</h4>
            <h6>Since 14,feb,2024</h6>
            <div className="profile-btns">
              <div>Change Profile</div>
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
              <label for="inputName">Full Name</label>
              <input type="text" class="form-control" id="inputName" />
            </div>
            <div class="form-group">
              <label for="inputEmail">Email</label>
              <input type="email" class="form-control" id="inputEmail" />
            </div>
            <div class="form-group">
              <label for="Mobile">Mobile</label>
              <input type="email" class="form-control" id="Mobile" />
            </div>
            <div class="form-group">
              <label for="Gender">Gender</label>
              <input type="email" class="form-control" id="Gender" />
            </div>
            <div class="form-group">
              <label for="Address">Address</label>
              <input type="email" class="form-control" id="Address" />
            </div>
            {/* <div class="form-group"> */}
            {/* <label for="inputName">Change Photo</label>
              <input type="file" class="form-control" id="inputName" /> */}
            {/* </div> */}

            <button className="edit-profile-tab">Edit Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin(Profile, "Profile");
