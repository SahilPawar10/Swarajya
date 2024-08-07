import React, { useEffect ,useState} from "react";
import "./layout.css";
import Sidebar from "../Sidebar/Sidebar";
import Avatar from "@mui/material/Avatar";
import avtar from "../../assets/logo1.jpg";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getOneUser, getVisitor } from "../../api/apiService";

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
