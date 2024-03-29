import React from "react";
import "./layout.css";
import Sidebar from "../Sidebar/Sidebar";

const LayoutAdmin = (Page) => {
  return () => (
    <div>
      <div className="admin-layout">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="admin-page">
          <div
            className="sidebar-header"
            style={{ height: "7%", backgroundColor: "red" }}
          ></div>
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
