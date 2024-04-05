import React from "react";
import "./layout.css";
import Sidebar from "../Sidebar/Sidebar";
import Avatar from "@mui/material/Avatar";
import avtar from "../../assets/member3.jpeg";
import { Link } from "react-router-dom";

const LayoutAdmin = (Page, menu) => {
  return () => (
    <div>
      <div className="admin-layout">
        <div className="sidebar">
          <Sidebar menu={menu} />
        </div>
        <div className="admin-page">
          <div className="sidebar-header">
            <div className="user-profile">
              <Link to="/profile">
                <Avatar alt="Cindy Baker" src={avtar} />
              </Link>
            </div>
          </div>
          <Page />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
/*

sidemenu  
20 /80

*/
