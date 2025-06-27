import React, { useEffect } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import "./account.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const clients = [
  {
    id: "DEMO2",
    name: "1Demo Two Ltd",
    status: "Client",
    type: "Limited",
    score: "G",
    email: "",
    phone: "-",
    created: "01/09/2022",
  },
  {
    id: "20",
    name: "208BusinessUp",
    status: "Client",
    type: "LLP",
    score: "A",
    email: "nupurlele123@gmail.com",
    phone: "7424669908",
    created: "03/08/2022",
  },
  {
    id: "Mryy",
    name: "Mryyy 11111 444444",
    status: "Prospect",
    type: "Limited",
    score: "",
    email: "",
    phone: "-",
    created: "25/10/2022",
  },
];
function Accounts() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [role, setRole] = React.useState("user");
  const setUser = async () => {
    const role = localStorage.getItem("userRole");
    setRole(JSON.parse(role));
    // setRole("admin");

    // if (id) {
    //   getOneUser(JSON.parse(id))
    //     .then((res) => {
    //       setUserData(res.data);
    //       console.log(res.data, "res");
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  };
  useEffect(() => {
    setUser();
  }, []);

  return (
    <div id="accounts">
      {/* <div className="about-container">
        <p>
          We believe in being transparent about our financials. As a valuable
          contributor, you have the right to garner a fair understanding of our
          incomes and investments through monthly amount.
        </p>
        <p>Click to see the Financial Statements. </p>

        <div className="f-reports">
          <div className="monthly-reports">
            <div className="report-heading">Monthly</div>
            <div className="reports">
              <div>
                <a href="https://docs.google.com/spreadsheets/d/1CaeGAa3aPscag36dYJLUtvsWVnxoHEF7L0O9RQmrxyA/edit?gid=0#gid=0">
                  FY 2025-26
                </a>
              </div>
              <div>
                <a href="https://docs.google.com/spreadsheets/d/1wNQJwdVCl8qCVO49Lb2DdiWRmFXUmH5c8BfKHASfM1s/edit#gid=0">
                  FY 2024-25
                </a>
              </div>
              <div>
                <a href="https://docs.google.com/spreadsheets/d/1YJS2AmaRTa0FQvlwST1tIjgT0Xm9JCFC72-26zLcbao/edit?usp=sharing">
                  FY 2023-24
                </a>
              </div>
            </div>
          </div>
          <div className="shivjayanti-reports">
            <div className="report-heading"> Shivjayanti</div>
            <div className="reports">
              <div>
                <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7PDpZTqAEQYLm4ysNboPtUbFd6p__S_WOJMsAe_KSWV18rtbb833JnFAigWRlZMTyoZ8dZeQvTnpX/pub?output=pdf">
                  FY 2025-26
                </a>
              </div>
              <div>
                <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSmp16THfF1Ir-lnR9VtxgWaD-ETWB6SxcGeNliA5w9SbYTyq0zy0kE9ycEX4ruQl_0oVYrS4QYs0WJ/pub?output=pdf">
                  2024
                </a>
              </div>
              <div>
                <a href="">2023</a>
              </div>
            </div>
          </div>
          <div className="annual-reports">
            <div className="report-heading"> Reports</div>
            <div className="reports">
              <div>
                <a href="https://docs.google.com/spreadsheets/d/1mVv6eMKLPtctwi8iaUI4GDz_HB1HKq5rovHekaVf9OQ/edit?gid=0#gid=0">
                  Expense 2025
                </a>
              </div>
              <div>
                <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQyNXmLHO9Xo-hK5GnakkZdTrwzALXrt0oU7v77imhUM8_knYSpeay33LccIrWgPR4yhtemM95DYG8P/pubhtml?gid=0&single=true">
                  Expense 2024
                </a>
              </div>
              <div>
                <a href="#">Expense 2023</a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="DashBoard" {...a11yProps(1)} />
            <Tab label="Credits" {...a11yProps(2)} />
            <Tab label="Debits" {...a11yProps(3)} />
            <Tab label="Monthly" {...a11yProps(4)} />
            <Tab label="Installments" {...a11yProps(5)} />
            <Tab label="Active Loan" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="account-main-content">
            {/* Accounts */}
            <div className="accounts-dashboard">
              <h2>Accounts</h2>
              <div className="accounts-card  balance ">
                16000 <span>Available Balance</span>
              </div>
              <div className="accounts-card credits">
                23000 <span>Total Credits</span>
              </div>
              <div className="accounts-card debits">
                1,676.11 <span>Total Debits</span>
              </div>
              <div className="accounts-card loanouts">
                12000 <span>Total Loanouts</span>
              </div>
            </div>

            {/* Actions */}

            <div className="accounts-actions">
              <h2>Actions</h2>
              <div className={`accounts-buttons-${role}`}>
                <button className="account-btn loan-btn">
                  Loan Application
                </button>
                <button className="account-btn monthly-btn">Monthly</button>
                {role === "admin" && (
                  <>
                    <button className="account-btn debit-btn">
                      Debit Entry
                    </button>
                    <button className="account-btn  credit-btn">
                      Credit Entry
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* History */}
            <div className="history">
              <h2>Monthly</h2>
              <div className="history-item">
                <span>Sahil Pawar </span>
                <span className="positive">300</span>
              </div>
              <div className="history-item">
                <span>Dipak Pawar</span>
                <span className="positive">150</span>
              </div>
              <div className="history-item">
                <span>Vishal Nikam</span>
                <span className="positive">150</span>
              </div>
              <div className="history-item">
                <span>Amar Pawar</span>
                <span className="positive">100</span>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Business Type</th>
                    <th>Credit Score</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={i}>
                      <td>{c.id}</td>
                      <td className="blue-link">{c.name}</td>
                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{c.type}</td>
                      <td className="bold-score">{c.score || "-"}</td>
                      <td>{c.email || "-"}</td>
                      <td>{c.phone}</td>
                      <td>{c.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Business Type</th>
                    <th>Credit Score</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={i}>
                      <td>{c.id}</td>
                      <td className="blue-link">{c.name}</td>
                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{c.type}</td>
                      <td className="bold-score">{c.score || "-"}</td>
                      <td>{c.email || "-"}</td>
                      <td>{c.phone}</td>
                      <td>{c.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Business Type</th>
                    <th>Credit Score</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={i}>
                      <td>{c.id}</td>
                      <td className="blue-link">{c.name}</td>
                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{c.type}</td>
                      <td className="bold-score">{c.score || "-"}</td>
                      <td>{c.email || "-"}</td>
                      <td>{c.phone}</td>
                      <td>{c.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Business Type</th>
                    <th>Credit Score</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={i}>
                      <td>{c.id}</td>
                      <td className="blue-link">{c.name}</td>
                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{c.type}</td>
                      <td className="bold-score">{c.score || "-"}</td>
                      <td>{c.email || "-"}</td>
                      <td>{c.phone}</td>
                      <td>{c.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Business Type</th>
                    <th>Credit Score</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={i}>
                      <td>{c.id}</td>
                      <td className="blue-link">{c.name}</td>
                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{c.type}</td>
                      <td className="bold-score">{c.score || "-"}</td>
                      <td>{c.email || "-"}</td>
                      <td>{c.phone}</td>
                      <td>{c.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Business Type</th>
                    <th>Credit Score</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={i}>
                      <td>{c.id}</td>
                      <td className="blue-link">{c.name}</td>
                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{c.type}</td>
                      <td className="bold-score">{c.score || "-"}</td>
                      <td>{c.email || "-"}</td>
                      <td>{c.phone}</td>
                      <td>{c.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default LayoutAdmin(Accounts, "account");

// <div className="account-dashboard">
//   {/* Top Navigation */}
//   <div className="account-top-nav">
//     <div className="account-nav-left">
//       {/* <div className="account-logo">GF</div> */}
//       <div className="account-nav-links">
//         {/* <span className="active">Dashboard</span>
//         <span>Credits</span>
//         <span>Debits</span>
//         <span>Monthly</span>
//         <span>Installments</span>
//         <span>Active Loan</span> */}
//         {/* <span>Help</span> */}
//       </div>
//     </div>
//   </div>

//   {/* Main Content */}
// </div>;
