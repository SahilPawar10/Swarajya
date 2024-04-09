import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Groups2Icon from "@mui/icons-material/Groups2";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

function Sidebar({ menu = "menu" }) {
  const [sidebar, setsideBar] = useState(false);
  useEffect(() => {
    // console.log("siderBar Rendered");
    document.getElementById(menu).style.backgroundColor = "#fba704";
    document.getElementById(menu).style.borderRadius = "8px";
  }, [menu]);

  const onToggleClick = () => {
    // console.log("toggle");
    setsideBar(!sidebar);
  };

  return (
    <div>
      <div className="sidebar-logo">
        <div className="sidebar-icon">
          <DashboardIcon sx={{ fontSize: "3.3rem", color: "#fd7e14" }} />
        </div>

        <div className="sibebar-mob-icon">
          <MenuIcon
            sx={{
              transform: "rotate(0deg)",
              fontSize: "2rem",
              color: "#fd7e14",
              marginTop: "0.3rem",
            }}
            onClick={onToggleClick}
          />
        </div>
        {/**/}

        <div className="sidebar-heading">
          {sidebar ? <h4>Home</h4> : <h2>Swarajya</h2>}
        </div>
      </div>

      {sidebar ? (
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
          <li id="gallery">
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
          <li id="Profile">
            <span>
              <AccountCircleIcon
                sx={{
                  transform: "rotate(0deg)",
                  fontSize: "1.4rem",
                  color: "#fd7e14",
                  paddingTop: "0.3rem",
                }}
              />
            </span>
            <Link className="side-menu">Profile</Link>
          </li>
        </ul>
      ) : (
        <h5 id={menu}></h5>
      )}

      <div className="web-sidebar">
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
          <li id="gallery">
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
          <li id="Profile">
            <span>
              <AccountCircleIcon
                sx={{
                  transform: "rotate(0deg)",
                  fontSize: "1.4rem",
                  color: "#fd7e14",
                  paddingTop: "0.3rem",
                }}
              />
            </span>
            <Link to="/profile" className="side-menu">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
