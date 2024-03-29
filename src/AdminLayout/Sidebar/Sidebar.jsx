import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Groups2Icon from "@mui/icons-material/Groups2";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CollectionsIcon from "@mui/icons-material/Collections";

function Sidebar() {
  return (
    <div>
      <div className="sidebar-logo">
        <DashboardIcon sx={{ fontSize: "3.5rem" }} />
        <div className="sidebar-heading">
          <h2>Swarajya</h2>
        </div>
      </div>

      <ul className="sidebar-menus">
        <li>
          <span>
            {" "}
            <Groups2Icon sx={{ transform: "rotate(0deg)" }} />
          </span>

          <Link className="side-menu">Team</Link>
        </li>
        <li>
          <span>
            <SensorOccupiedIcon sx={{ transform: "rotate(0deg)" }} />
          </span>
          <Link to="/visitors" className="side-menu">
            Visitors
          </Link>
        </li>
        <li>
          <span>
            <AccountBalanceWalletIcon sx={{ transform: "rotate(0deg)" }} />
          </span>
          <Link to="/accounts" className="side-menu">
            Accounts
          </Link>
        </li>
        <li>
          <span>
            <CollectionsIcon sx={{ transform: "rotate(0deg)" }} />
          </span>
          <Link className="side-menu">Gallery</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
