import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import "./account.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {
  adminRoles,
  createCreditEntry,
  createDebitEntry,
  dashBoarReport,
  getActiveLoans,
  getAllCreditsRecord,
  getAllDebitsRecord,
  getAllInstallment,
} from "../../api/apiService";
import { TextField } from "@mui/material";
import CustomizedSnackbars from "../../MainLayout/Components/ContactUS/CustomizedSnackbars";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Accounts() {
  const [open, setOpen] = React.useState(false);
  const [debitModal, setdebitModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDebitOpen = () => setdebitModal(true);
  const handleDebitClose = () => setdebitModal(false);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [role, setRole] = React.useState("user");
  const [tableData, setTableData] = React.useState([]);
  const [credit, setCredit] = React.useState();
  const [debit, setDebit] = React.useState();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [dashReport, setdashReport] = React.useState({
    balance: 0,
    credits: 0,
    debits: 0,
    loan: 0,
    monthly: [],
  });

  const handleSnackClose = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  const handleDateChange = (newValue, form) => {
    console.log(newValue, form, "newValue");
    setSelectedDate(newValue);
    if (form === "credit") {
      setCredit((prev) => ({
        ...prev,
        date: newValue.format("DD-MM-YYYY"),
      }));
    } else if (form === "debit") {
      setDebit((prev) => ({
        ...prev,
        date: newValue.format("DD-MM-YYYY"),
      }));
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCredit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDebitChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDebit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreditEntrySubmit = async () => {
    // console.log(credit, "debitForm");
    setLoading(true);
    await createCreditEntry(credit)
      .then((res) => {
        console.log(res.data);
        // setMessage("record inserted successfuly");
        setLoading(false);
        setSnack({
          open: true,
          message: "Data saved successfully!",
          severity: "success",
        });
        handleClose();
        setCredit();
      })
      .catch((err) => {
        console.log(err, "err");
        setSnack({
          open: true,
          message: "something went wrong",
          severity: "error",
        });
      });
  };
  const handleDebitEntrySubmit = async () => {
    setLoading(true);
    await createDebitEntry(debit)
      .then((res) => {
        console.log(res.data);
        console.log(res, "res");
        // setMessage("record inserted successfuly");
        setLoading(false);
        setSnack({
          open: true,
          message: "Data saved successfully!",
          severity: "success",
        });
        handleClose();
        setDebit();
      })
      .catch((err) => {
        console.log(err, "err");
        // setMessage(err.response.data.message);
        setSnack({
          open: true,
          message: "something went wrong",
          severity: "error",
        });
      });
  };
  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      getAllCredits();
    } else if (newValue === 2) {
      getAllDebits();
    } else if (newValue === 3) {
      getAllDebits();
    } else if (newValue === 4) {
      getAllInstallMentRcords();
    } else if (newValue === 5) {
      getLoanSummary();
    }
    setValue(newValue);
  };

  const setUser = async () => {
    const role = localStorage.getItem("userRole");
    setRole(JSON.parse(role));
    // setRole("admin");
  };

  const getAllCredits = async () => {
    getAllCreditsRecord()
      .then((res) => {
        // console.log(res.data, "res");
        setTableData(res.data);
      })
      .catch((err) => console.log(err, "err"));
    // setRole("admin");
  };

  const getAllDebits = async () => {
    getAllDebitsRecord()
      .then((res) => {
        // console.log(res.data, "resDebit");
        setTableData(res.data);
      })
      .catch((err) => console.log(err, "err"));
    // setRole("admin");
  };

  const getAllInstallMentRcords = async () => {
    getAllInstallment()
      .then((res) => {
        // console.log(res.data, "installments");
        setTableData(res.data);
      })
      .catch((err) => console.log(err, "err"));
  };

  const getLoanSummary = async () => {
    getActiveLoans()
      .then((res) => {
        // console.log(res.data, "installments");
        setTableData(res.data);
      })
      .catch((err) => console.log(err, "err"));
  };
  const dashboardReport = async () => {
    dashBoarReport()
      .then((res) => {
        setdashReport((prev) => ({
          ...prev,
          balance: res.data.totalBalance,
          credits: res.data.overAllCredits,
          debits: res.data.overAllDebits,
          loan: res.data.totalLoanuts,
          monthly: res.data.monthly,
        }));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setUser();
    dashboardReport();
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
        <Box
          sx={{
            borderBottom: 1,

            borderColor: "divider",
          }}
        >
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
                {dashReport.balance} <span>Available Balance</span>
              </div>
              <div className="accounts-card credits">
                {dashReport.credits} <span>Total Credits</span>
              </div>
              <div className="accounts-card debits">
                {dashReport.debits} <span>Total Debits</span>
              </div>
              <div className="accounts-card loanouts">
                {dashReport.loan} <span>Total Loanouts</span>
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
                {adminRoles.includes(role) && (
                  <>
                    <button
                      className="account-btn debit-btn"
                      onClick={handleDebitOpen}
                    >
                      Debit Entry
                    </button>
                    <button
                      className="account-btn  credit-btn"
                      onClick={handleOpen}
                    >
                      Credit Entry
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* History */}
            <div className="history">
              <h2>Monthly</h2>
              {dashReport.monthly.length > 0 &&
                dashReport.monthly.map((record, index) => (
                  <div key={index} className="history-item">
                    <span>{record.member.firstName} </span>
                    <span className="positive">{record.amount}</span>
                  </div>
                ))}
              {/* <div className="history-item">
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
              </div> */}
            </div>
          </div>
        </CustomTabPanel>
        {/* Credit Table */}
        <CustomTabPanel value={value} index={1}>
          <div className="cretis-table">
            <div className="account-credits">
              <div className="account-credits-table-container">
                <table className="client-table">
                  <thead>
                    <tr>
                      <th>SR.NO</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Credits By</th>
                      <th>description</th>
                      {/* <th>Email</th>
                      <th>Telephone</th>
                      <th>Created</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.map((c, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td className="blue-link">{c?.date}</td>
                        <td>
                          <span className={`status ${"client"}`}>
                            {c?.amount} &#8377;
                          </span>
                        </td>
                        {/* <td>{c.type}</td> */}
                        <td className="bold-score">{c.creditBy || "-"}</td>
                        <td>{c?.desc || "-"}</td>
                        {/* <td>{c.phone}</td>
                        <td>{c.created}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        {/* Debit Table */}
        <CustomTabPanel value={value} index={2}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Debits By</th>
                    <th>description</th>
                    {/* <th>Email</th>
                      <th>Telephone</th>
                      <th>Created</th> */}
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="blue-link">{c.date}</td>
                      <td>
                        <span className={`status ${"prospect"}`}>
                          {c?.amount} &#8377;
                        </span>
                      </td>
                      {/* <td>{c.type}</td> */}
                      <td className="bold-score">{c.debitBy || "-"}</td>
                      <td>{c?.desc || "-"}</td>
                      {/* <td>{c.phone}</td>
                        <td>{c.created}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        {/* Monthly */}
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
                      <td>{c?.email || "-"}</td>
                      <td>{c?.phone}</td>
                      <td>{c?.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        {/* Installment Table */}
        <CustomTabPanel value={value} index={4}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>SR.NO</th>
                    {/* <th>Loan ID</th> */}
                    <th>Name</th>
                    <th>Loan Amount</th>
                    <th>Duration</th>
                    <th>Total Payble</th>
                    <th>Paid Amount</th>
                    <th>Remaining</th>
                    <th>Remark</th>
                    {/* <th>Telephone</th>
                    <th>Created</th> */}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c?.name || "-"}</td>
                      {/* <td>{c.loanId.id}</td> */}

                      <td>{c?.loanId?.loanAmount || "-"}</td>
                      <td>{c?.loanId?.duration || "-"}</td>
                      <td>{c?.loanId?.totalPaybale || "-"}</td>
                      <td>{c?.paidAmount || "-"}</td>
                      <td>{c?.remaining || "-"}</td>
                      <td>{c?.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        {/* Loan Summary */}
        <CustomTabPanel value={value} index={5}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>Name</th>
                    <th>Loan Amount</th>
                    <th>Total Paybale</th>
                    <th>Total Paid</th>
                    <th>Remaining</th>
                    <th>Duration</th>
                    <th>percentage</th>
                    <th>status</th>
                    <th>reason</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c.memberName}</td>
                      <td>
                        <span>{c?.loanAmount}</span>
                      </td>
                      <td>{c?.totalPayble}</td>
                      <td className="bold-score">{c.toalPaid || "-"}</td>
                      <td>{c?.totalRemaining || "-"}</td>
                      <td>{c?.duration}</td>
                      <td>{c?.percentage}</td>
                      <td>{c?.status}</td>
                      <td>{c?.reason}</td>
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
      {/* credit model */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 1,
              textAlign: "center",
              fontSize: "30px",
              color: "blueviolet",
              fontWeight: "800",
            }}
          >
            Credit Form
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              id="credit-date"
              onChange={(newValue) => {
                handleDateChange(newValue, "credit");
              }}
              renderInput={(params) => (
                <TextField
                  name="date"
                  id="credit-date"
                  {...params}
                  fullWidth
                  sx={{ marginTop: "30px" }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="amount"
            id="amount"
            name="amount"
            defaultValue="0"
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            onChange={onChange}
          />

          {/* <TextField
            fullWidth
            label="Duration"
            id="duration"
            name="duration"
            defaultValue="0"
            onChange={onChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
          /> */}
          <TextField
            fullWidth
            label="CreditBy"
            id="creditBy"
            name="creditBy"
            onChange={onChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            // onChange={onChange}
          />
          <TextField
            fullWidth
            label="Descprition"
            id="desc"
            name="desc"
            onChange={onChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ marginBottom: "30px" }}
            onClick={handleCreditEntrySubmit}
          >
            Submit
            {/* {loading ? <i>Sending</i> : "Submit"} */}
          </Button>
        </Box>
      </Modal>{" "}
      ;{/* debit Modal */}
      <Modal
        open={debitModal}
        onClose={handleDebitClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 1,
              textAlign: "center",
              fontSize: "30px",
              color: "blueviolet",
              fontWeight: "800",
            }}
          >
            Debit Form
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              id="debit-date"
              onChange={(newValue) => {
                handleDateChange(newValue, "debit");
              }}
              renderInput={(params) => (
                <TextField
                  name="date"
                  id="debit-date"
                  {...params}
                  fullWidth
                  sx={{ marginTop: "30px" }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="amount"
            id="debit-amount"
            name="amount"
            defaultValue="0"
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            onChange={onDebitChange}
          />

          {/* <TextField
            fullWidth
            label="Duration"
            id="duration"
            name="duration"
            defaultValue="0"
            onChange={onChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
          /> */}
          <TextField
            fullWidth
            label="DebitBy"
            id="debitBy"
            name="debitBy"
            onChange={onDebitChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            // onChange={onChange}
          />
          <TextField
            fullWidth
            label="Descprition"
            id="debit-desc"
            name="desc"
            onChange={onDebitChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ marginBottom: "30px" }}
            onClick={handleDebitEntrySubmit}
          >
            Submit
            {/* {loading ? <i>Sending</i> : "Submit"} */}
          </Button>
        </Box>
      </Modal>{" "}
      <CustomizedSnackbars
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={handleSnackClose}
      />
    </div>
  );
}

export default LayoutAdmin(Accounts, "account");
