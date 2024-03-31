import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Groups2Icon from "@mui/icons-material/Groups2";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CollectionsIcon from "@mui/icons-material/Collections";

function Sidebar({ menu }) {
  useEffect(() => {
    console.log("siderBar Rendered");
    document.getElementById(menu).style.backgroundColor = "#fba704";
    document.getElementById(menu).style.borderRadius = "8px";
  }, [menu]);

  return (
    <div>
      <div className="sidebar-logo">
        <DashboardIcon sx={{ fontSize: "3.3rem", color: "#fd7e14" }} />
        <div className="sidebar-heading">
          <h2>Swarajya</h2>
        </div>
      </div>

      <ul className="sidebar-menus">
        <li id="admin-home">
          <span>
            <Groups2Icon
              sx={{
                transform: "rotate(0deg)",
                fontSize: "1.4rem",
                color: "#fd7e14",
                paddingTop: "0.3rem",
              }}
            />
          </span>

          <Link className="side-menu " to="/admin">
            Home
          </Link>
        </li>
        <li id="visit">
          <span>
            <SensorOccupiedIcon
              sx={{
                transform: "rotate(0deg)",
                fontSize: "1.4rem",
                color: "#fd7e14",
                paddingTop: "0.3rem",
              }}
            />
          </span>
          <Link to="/visitors" className="side-menu">
            Visitors
          </Link>
        </li>
        <li id="account">
          <span>
            <AccountBalanceWalletIcon
              sx={{
                transform: "rotate(0deg)",
                fontSize: "1.4rem",
                color: "#fd7e14",
                paddingTop: "0.3rem",
              }}
            />
          </span>
          <Link to="/accounts" className="side-menu">
            Accounts
          </Link>
        </li>
        <li>
          <span>
            <CollectionsIcon
              sx={{
                transform: "rotate(0deg)",
                fontSize: "1.4rem",
                color: "#fd7e14",
                paddingTop: "0.3rem",
              }}
            />
          </span>
          <Link className="side-menu">Gallery</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
