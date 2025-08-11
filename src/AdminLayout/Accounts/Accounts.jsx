import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import "./account.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import {
  addMonthlyEntry,
  adminRoles,
  createCreditEntry,
  createDebitEntry,
  createInstallmentEntry,
  createLoanEntry,
  dashBoarReport,
  downloadSampleMonthlyFile,
  getActiveLoans,
  getAllCreditsRecord,
  getAllDebitsRecord,
  getAllInstallment,
  getAllMonthlyData,
  getContributionData,
  getLoanRequest,
  getUserWithoutPhoto,
  importMonthlyFile,
  updateLoanLoanStatus,
  updateLoanRequest,
} from "../../api/apiService";
import { TextField } from "@mui/material";
import CustomizedSnackbars from "../../MainLayout/Components/ContactUS/CustomizedSnackbars";
import UserSelect from "./UsersSelect";
import { LoanSelect, MonthSelect } from "./LoanSelect";
import InputFileUpload from "./InputFileUpload";
import { generateExcelFileBuffer } from "../../utils/common";
import { json } from "react-router-dom";
import CircularWithValueLabel from "../../MainLayout/screens/Loading";

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

const filterdMonthyData = (data) => {
  const filteredData = data.map((row) => {
    return {
      Date: row.date,
      month: row.month,
      year: row.year,
      member: row.member.firstName + " " + row.member.lastName,
      Amount: row.amount,
    };
  });

  return filteredData;
};

const filterdInstallmentData = (data) => {
  const filteredData = data.map((row) => {
    return {
      Date: row.date,
      Name: row.name,
      LoanAmount: row.loanId?.loanAmount,
      TotalPaybale: row.loanId?.totalPaybale,
      Duration: row.duration,
      PaidAmount: row.paidAmount,
      Remaining: row.remaining,
      Remark: row.remark,
    };
  });

  return filteredData;
};
function Accounts() {
  const [open, setOpen] = React.useState(false);
  const [debitModal, setdebitModal] = React.useState(false);
  const [loanAppModal, setloanAppModal] = React.useState(false);
  const [installmentModel, setinstallmentModel] = React.useState(false);
  const [monthlyModel, setMonthlyModel] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDebitOpen = () => setdebitModal(true);
  const handleDebitClose = () => setdebitModal(false);
  const handleLoanApptClose = () => setloanAppModal(false);
  const handleInstallmentClose = () => setinstallmentModel(false);
  const handleMonthlyOpen = () => setMonthlyModel(true);
  const handleMonthlyClose = () => setMonthlyModel(false);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [role, setRole] = React.useState("user");
  const [userId, setUserId] = React.useState("");
  const [tableData, setTableData] = React.useState([]);
  const [credit, setCredit] = React.useState();
  const [debit, setDebit] = React.useState();
  // const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLoan, setSelectedLoan] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [monthlyForm, setMonthlyform] = useState("");

  const [monthlyTableData, setMonthlyTableData] = useState([]);
  const [contribution, setContribution] = useState([]);

  const [loanForm, setLoanForm] = React.useState();
  const [installmentForm, setInstallmentForm] = React.useState();
  const [yourContribution, setYourContribution] = useState([]);

  // const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMontlyUser, setselectedMontlyUser] = useState("");

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

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

  const handleUserChange = (event, form) => {
    setSelectedUser(event.target.value);
    const name = event.target.name;
    const value = event.target.value;

    if (form === "loan") {
      setLoanForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (form === "installment") {
      setInstallmentForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (form === "monthly") {
      setMonthlyform((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleLoanChange = (event) => {
    setSelectedLoan(event.target.value);
    const name = event.target.name;
    const value = event.target.value;

    setInstallmentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    const name = event.target.name;
    const value = event.target.value;

    setMonthlyform((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMonthFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setMonthlyform((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMonthlySubmit = () => {
    // console.log(monthlyForm, ",monthlyform");

    if (!monthlyForm?.month) {
      monthlyForm.month = selectedMonth;
    }

    addMonthlyEntry(monthlyForm)
      .then((res) => {
        console.log(res.data);
        // setMessage("record inserted successfuly");
        setLoading(false);
        setSnack({
          open: true,
          message: "Entry added ",
          severity: "success",
        });
        handleMonthlyClose();
        setMonthlyform();
        setSelectedUser();
        dashboardReport();
      })
      .catch((err) => {
        console.log(err, "err");
        setSnack({
          open: true,
          message: "something went wrong",
          severity: "error",
        });
        setMonthlyform();
        setSelectedUser();
      });
  };

  const handleLoanAppOpen = () => {
    setloanAppModal(true);
  };

  const handleInstallmentOpen = () => {
    setSelectedUser();
    setinstallmentModel(true);
  };

  const handleUpdateLoanStatus = async () => {
    setLoading(true);
    await updateLoanLoanStatus()
      .then((res) => {
        console.log(res.data);
        // setMessage("record inserted successfuly");
        setLoading(false);
        setSnack({
          open: true,
          message: "Data saved successfully!",
          severity: "success",
        });
        getLoanSummary();
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

  const handleDateChange = (newValue, form) => {
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
    } else if (form === "loan") {
      setLoanForm((prev) => ({
        ...prev,
        date: newValue.format("DD-MM-YYYY"),
      }));
    } else if (form === "installment") {
      setInstallmentForm((prev) => ({
        ...prev,
        date: newValue.format("DD-MM-YYYY"),
      }));
    } else if (form === "monthly") {
      setMonthlyform((prev) => ({
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

  const onLoanFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoanForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onInstallmentFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInstallmentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreditEntrySubmit = async () => {
    // console.log(credit, "debitForm");

    if (!credit?.date) {
      credit.date = selectedDate.format("DD-MM-YYYY");
    }
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
        dashboardReport();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "err");
        setSnack({
          open: true,
          message: "something went wrong",
          severity: "error",
        });
      });
  };

  const handleInstallmentEntrySubmit = async () => {
    if (!installmentForm?.date) {
      installmentForm.date = selectedDate.format("DD-MM-YYYY");
    } else if (!installmentForm?.member) installmentForm.member = selectedUser;

    setLoading(true);
    await createInstallmentEntry(installmentForm)
      .then((res) => {
        console.log(res.data);
        // setMessage("record inserted successfuly");
        setLoading(false);
        setSnack({
          open: true,
          message: "Data saved successfully!",
          severity: "success",
        });
        handleInstallmentClose();
        setInstallmentForm();
        setSelectedUser();
        setSelectedLoan();
        getAllInstallMentRcords();
        dashboardReport();
      })
      .catch((err) => {
        console.log(err, "err");
        setSnack({
          open: true,
          message: "something went wrong",
          severity: "error",
        });
        setInstallmentForm();
        handleInstallmentClose();
        setSelectedUser();
        setSelectedLoan();
        setLoading(false);
      });
  };
  const handleDebitEntrySubmit = async () => {
    if (!debit?.date) {
      debit.date = selectedDate.format("DD-MM-YYYY");
    }
    setLoading(true);
    await createDebitEntry(debit)
      .then((res) => {
        // console.log(res.data);
        // console.log(res, "res");
        // setMessage("record inserted successfuly");
        setLoading(false);
        setSnack({
          open: true,
          message: "Data saved successfully!",
          severity: "success",
        });
        handleDebitClose();
        setDebit();
        // dashboardReport();
        getAllDebits();
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
        // setMessage(err.response.data.message);
        setSnack({
          open: true,
          message: "something went wrong",
          severity: "error",
        });
      });
  };
  const handleLoanEntrySubmit = async () => {
    setLoading(true);
    // console.log(loanForm, "loanForm");

    if (!loanForm?.date) {
      loanForm.date = selectedDate.format("DD-MM-YYYY");
    } else if (!loanForm?.member) loanForm.member = selectedUser;
    await createLoanEntry(loanForm)
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = "loan-agreement.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setLoading(false);
        setSnack({
          open: true,
          message: "Application Submitted Successfully..!",
          severity: "success",
        });
        handleLoanApptClose();
        setLoanForm();
        dashboardReport();
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
        // setMessage(err.response.data.message);
        setSnack({
          open: true,
          message: "something went wrong",
          severity: "error",
        });
        handleLoanApptClose();
      });
  };
  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      getAllCredits();
    } else if (newValue === 2) {
      getAllDebits();
    } else if (newValue === 3) {
      getAllMonthly(); //monthly
    } else if (newValue === 4) {
      getAllInstallMentRcords();
    } else if (newValue === 5) {
      getLoanSummary();
    } else if (newValue === 6) {
      loanPrequests();
    }
    setValue(newValue);
  };

  const setUser = async () => {
    const role = localStorage.getItem("userRole");
    const id = localStorage.getItem("userId");
    setRole(JSON.parse(role));
    setUserId(JSON.parse(id));
    console.log(userId, "UserId");
    // setRole("admin");
  };

  const getAllCredits = async () => {
    setLoading(true);
    getAllCreditsRecord()
      .then((res) => {
        setLoading(false);
        // console.log(res.data, "res");
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
    // setRole("admin");
  };
  // const getAllUsers = async () => {
  //   getUserWithoutPhoto()
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((err) => console.log(err, "err"));
  //   // setRole("admin");
  // };

  const getAllDebits = async () => {
    setLoading(true);
    getAllDebitsRecord()
      .then((res) => {
        setLoading(false);
        // console.log(res.data, "resDebit");
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
    // setRole("admin");
  };

  const getAllMonthly = async () => {
    setLoading(true);
    getAllMonthlyData()
      .then((res) => {
        setLoading(false);
        // console.log(res.data, "resDebit");
        setMonthlyTableData(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
    // setRole("admin");
  };

  const getAllInstallMentRcords = async () => {
    setLoading(true);
    getAllInstallment()
      .then((res) => {
        setLoading(false);
        // console.log(res.data, "installments");
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
  };

  const getLoanSummary = async () => {
    setLoading(true);
    getActiveLoans()
      .then((res) => {
        setLoading(false);
        // console.log(res.data, "installments");
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
  };
  const loanPrequests = async () => {
    getLoanRequest()
      .then((res) => {
        console.log(res, "loan Req");
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
          // monthly: res.data.monthly,
        }));
      })
      .catch((err) => console.log(err));
  };

  const approveLoanRequest = async (id) => {
    updateLoanRequest({ id: id })
      .then((res) => {
        setSnack({
          open: true,
          message: "Request approved successfully!",
          severity: "success",
        });
        loanPrequests();
      })
      .catch((err) => console.log(err));
  };

  const monthlySampleFileDownload = async (id) => {
    const res = await downloadSampleMonthlyFile();

    const blob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Sample-Monthly-Data.xlsx";
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    setSnack({
      open: true,
      message: "File downloaded successfully!",
      severity: "success",
    });
  };

  const exportDataDownload = (data, fileName) => {
    const res = generateExcelFileBuffer(data, fileName);
    const blob = new Blob([res], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    setSnack({
      open: true,
      message: "File downloaded successfully!",
      severity: "success",
    });
  };

  const handleExcelUpload = (files) => {
    console.log("Import file selected:", files[0]);
    // Upload logic specific to invoice
    const formData = new FormData();
    formData.append("file", files[0]);
    if (files.length > 0) {
      importMonthlyFile(formData)
        .then((res) => {
          // setLoading(false);
          setSnack({
            open: true,
            message: "File Imported Successfully!",
            severity: "success",
          });
          dashboardReport();
          getAllMonthly();
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);

          setSnack({
            open: true,
            message: "Error Upoading File..",
            severity: "error",
          });
        });
    }
  };

  const getContribution = () => {
    getContributionData()
      .then((res) => {
        // console.log(res.data, "installments");
        setContribution(res.data);

        const user = contribution?.filter((item) => item.user.id === userId);
        console.log("currUSer", user, userId);
      })
      .catch((err) => console.log(err, "err"));
  };

  const filteredData = monthlyTableData?.filter((item) => {
    const matchMonth = selectedMonth ? item.month === selectedMonth : true;
    const matchYear = selectedYear
      ? item.year?.toString() === selectedYear
      : true;

    const matchUser = selectedMontlyUser
      ? item?.member.firstName + " " + item?.member.lastName ===
        selectedMontlyUser
      : true;
    return matchMonth && matchYear && matchUser;
  });

  const YourContribution = contribution?.filter(
    (item) => item.user.id === userId
  );

  useEffect(() => {
    setUser();
    getContribution();
    dashboardReport();
  }, []);

  useEffect(() => {
    if (userId && contribution?.length > 0) {
      const filtered = contribution.filter((item) => item.user._id === userId);
      setYourContribution(filtered);
      console.log(contribution, "yourContribution", userId);
    }
  }, [userId, contribution]);

  return (
    <div id="accounts">
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
            <Tab label="Active Loan" {...a11yProps(6)} />0
            {role !== "user" && <Tab label="Approve Loan" {...a11yProps(7)} />}
            <Tab label="Old DashBoard" {...a11yProps(8)} />
          </Tabs>
        </Box>
        {/* DashBoard */}
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
                <button
                  className="account-btn loan-btn"
                  onClick={handleLoanAppOpen}
                >
                  Loan Application
                </button>
                <button
                  className="account-btn monthly-btn"
                  // onClick={handleMonthlyOpen}
                >
                  {/* Monthly */}
                  <span className="urcontribution">
                    {" "}
                    {yourContribution[0]?.totalAmount || "Monthly"}
                  </span>
                </button>
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

            <div className="history">
              <h2>Contribution</h2>
              <div className="account-card-box">
                {contribution.length > 0 &&
                  contribution.map((record, index) => (
                    <div
                      key={index}
                      className={`history-item fade-in ${
                        index === 0 ? "top-payer" : "top-payer"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="payer-name">
                        {record.user.firstName + " " + record.user.lastName}
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : ""}
                      </span>
                      <span className="payer-amount">
                        ₹{record.totalAmount}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CustomTabPanel>
        {/* Credit Table */}
        <CustomTabPanel value={value} index={1}>
          {loading ? (
            <CircularWithValueLabel />
          ) : (
            <div className="cretis-table">
              <div className="account-credits">
                {role !== "user" && (
                  <div className="tab-buttons">
                    <div class="button-group-loan">
                      <button class="btn-loan approve" onClick={handleOpen}>
                        Add Credit
                      </button>
                      <button
                        class="btn-loan reject"
                        onClick={() => {
                          exportDataDownload(tableData, "creditEntry.xlsx");
                        }}
                      >
                        Export{" "}
                      </button>
                    </div>
                  </div>
                )}
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
          )}
        </CustomTabPanel>
        {/* Debit Table */}
        <CustomTabPanel value={value} index={2}>
          {loading ? (
            <CircularWithValueLabel />
          ) : (
            <div className="account-credits">
              {role !== "user" && (
                <div className="tab-buttons">
                  <div class="button-group-loan">
                    <button class="btn-loan approve" onClick={handleDebitOpen}>
                      Add Debit
                    </button>
                    <button
                      class="btn-loan reject"
                      onClick={() => {
                        exportDataDownload(tableData, "debitEntry.xlsx");
                      }}
                    >
                      Export{" "}
                    </button>
                  </div>
                </div>
              )}
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
          )}
        </CustomTabPanel>
        {/* Monthly */}
        <CustomTabPanel value={value} index={3}>
          {loading ? (
            <CircularWithValueLabel />
          ) : (
            <div className="account-credits">
              <div className="tab-buttons-monthly">
                <div style={{ display: "flex", gap: "10px" }}>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">All Months</option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    {[...new Set(monthlyTableData.map((c) => c.year))]
                      .filter((y) => y)
                      .map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                  </select>
                  <select
                    value={setselectedMontlyUser}
                    onChange={(e) => setselectedMontlyUser(e.target.value)}
                  >
                    <option value="" disabled selected={!selectedMontlyUser}>
                      {selectedMontlyUser || "All Members"}
                    </option>{" "}
                    {[
                      ...new Set(
                        monthlyTableData.map(
                          (c) => c?.member.firstName + " " + c?.member.lastName
                        )
                      ),
                    ]
                      .filter((y) => y)
                      .map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  {" "}
                  {role !== "user" && (
                    // <div className="tab-buttons">
                    <div class="button-group-loan">
                      <button
                        class="btn-loan approve"
                        onClick={handleMonthlyOpen}
                      >
                        createSingle{" "}
                      </button>
                      <button
                        class="btn-loan approve"
                        onClick={monthlySampleFileDownload}
                      >
                        Sample File
                      </button>
                      {/* <button class="btn-loan approve">Import </button> */}
                      <InputFileUpload
                        onFilesSelected={handleExcelUpload}
                        label="Import"
                      />
                      <button
                        class="btn-loan approve"
                        onClick={() => {
                          exportDataDownload(
                            filterdMonthyData(monthlyTableData),
                            "monthly.xlsx"
                          );
                        }}
                      >
                        Export{" "}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="account-credits-table-container">
                <table className="client-table">
                  <thead>
                    <tr>
                      <th>SR.NO</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Month</th>
                      <th>Year</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((c, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{c?.date}</td>
                        <td>
                          {c?.member.firstName + " " + c?.member.lastName}
                        </td>
                        <td>{c?.month}</td>
                        <td>{c?.year || "-"}</td>
                        <td>{c?.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CustomTabPanel>
        {/* Installment Table */}
        <CustomTabPanel value={value} index={4}>
          {loading ? (
            <CircularWithValueLabel />
          ) : (
            <div className="account-credits">
              {role !== "user" && (
                <div className="tab-buttons">
                  <div class="button-group-loan">
                    <button
                      class="btn-loan approve"
                      onClick={handleInstallmentOpen}
                    >
                      Add Installment
                    </button>
                    <button
                      class="btn-loan reject"
                      onClick={() => {
                        exportDataDownload(
                          filterdInstallmentData(tableData),
                          "installment.xlsx"
                        );
                      }}
                    >
                      Export{" "}
                    </button>
                  </div>
                </div>
              )}

              <div className="account-credits-table-container">
                <table className="client-table">
                  <thead>
                    <tr>
                      <th>SR.NO</th>
                      {/* <th>Loan ID</th> */}
                      <th>Name</th>
                      <th>Date</th>
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
                        <td>{c.date}</td>
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
          )}
        </CustomTabPanel>
        {/* Loan Summary */}
        <CustomTabPanel value={value} index={5}>
          {loading ? (
            <CircularWithValueLabel />
          ) : (
            <div className="account-credits">
              {role !== "user" && (
                <div className="tab-buttons">
                  <div class="button-group-loan">
                    <button
                      class="btn-loan approve"
                      onClick={handleUpdateLoanStatus}
                    >
                      Update LoanStatus
                    </button>
                    <button class="btn-loan reject">Export </button>
                  </div>
                </div>
              )}

              <div className="account-credits-table-container">
                <table className="client-table">
                  <thead>
                    <tr>
                      <th>SR.NO</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Loan Amount</th>
                      <th>Min Paybale</th>
                      <th>EMI</th>
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
                        <td>{c?.memberName}</td>
                        <td>{c?.date}</td>
                        <td>
                          <span>{c?.loanAmount}</span>
                        </td>
                        <td>{c?.minRequiredPay || "-"}</td>
                        <td>{c?.emi || "-"}</td>
                        <td>{c?.totalPaybale}</td>
                        <td className="bold-score">{c?.totalPaid || "-"}</td>
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
          )}
        </CustomTabPanel>
        {/* Approval Tab */}
        <CustomTabPanel value={value} index={6}>
          <div className="account-credits">
            <div className="account-credits-table-container">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Loan Amount</th>
                    <th>Duration</th>
                    <th>Total Payble</th>
                    <th>Percentage</th>
                    <th>reason</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c?.date || "-"}</td>
                      {/* <td>{c.loanId.id}</td> */}

                      <td>{c?.name || "-"}</td>
                      <td>{c?.loanAmount || "-"}</td>
                      <td>{c?.duration || "-"}</td>
                      <td>{c?.totalPaybale || "-"}</td>
                      <td>{c?.percentage || "-"}</td>
                      <td>{c?.reason}</td>
                      <td>
                        <div class="button-group-loan">
                          <button
                            class="btn-loan approve"
                            onClick={() => {
                              approveLoanRequest(c.id);
                            }}
                          >
                            Approve
                          </button>
                          <button class="btn-loan reject">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
        {/* old Dashboard */}
        <CustomTabPanel value={value} index={7}>
          <div className="about-container">
            <p>
              We believe in being transparent about our financials. As a
              valuable contributor, you have the right to garner a fair
              understanding of our incomes and investments through monthly
              amount.
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
      {/* debit Modal */}
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
      {/* Loan Application Model */}
      <Modal
        open={loanAppModal}
        onClose={handleLoanApptClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          // sx={style}
          sx={{
            ...style,
            width: "900px", // wider modal
            maxWidth: "90%",
            padding: "30px",
          }}
        >
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
            Loan Application
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Date Picker */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => handleDateChange(newValue, "loan")}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            {/* Loan Type */}
            {/* Loan Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="loan-type-label">Loan Type</InputLabel>
                <Select
                  labelId="loan-type-label"
                  name="loanType"
                  value={loanForm?.loanType || ""}
                  onChange={onLoanFormChange}
                  label="LoanType"
                >
                  <MenuItem value="instant">Instant</MenuItem>
                  <MenuItem value="long-term">Long-term</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Loan Amount */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                name="loanAmount"
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Percentage */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Percentage"
                name="percentage"
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* User Select */}
            <Grid item xs={12} sm={6}>
              <UserSelect
                selectedUser={selectedUser}
                handleUserChange={(event) => handleUserChange(event, "loan")}
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration"
                name="duration"
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Reason */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: "30px" }}
                onClick={handleLoanEntrySubmit}
              >
                {loading ? "Sending" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* Installment Model*/}
      <Modal
        open={installmentModel}
        onClose={handleInstallmentClose}
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
            Installment
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              id="installment-date"
              onChange={(newValue) => {
                // Only call when date changes
                if (!newValue?.isSame(selectedDate, "day")) {
                  handleDateChange(newValue, "monthly");
                }
              }}
              onAccept={(newValue) => {
                // Called even when selecting the same date again
                handleDateChange(newValue, "monthly");
              }}
              renderInput={(params) => (
                <TextField
                  name="date"
                  id="installment-date"
                  {...params}
                  fullWidth
                  sx={{ marginTop: "30px" }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Amount"
            id="installment-amount"
            name="paidAmount"
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            onChange={onInstallmentFormChange}
          />

          <TextField
            fullWidth
            label="Name"
            id="installment-amount"
            name="name"
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            onChange={onInstallmentFormChange}
          />

          <UserSelect
            selectedUser={selectedUser}
            value={selectedLoan}
            handleUserChange={(event) => handleUserChange(event, "installment")}
          />
          <LoanSelect
            selectedLoan={selectedLoan}
            handleLoanChange={handleLoanChange}
            member={selectedUser}
          />
          <TextField
            fullWidth
            label="Remark"
            id="installment-remark"
            name="remark"
            onChange={onInstallmentFormChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            // onChange={onChange}
          />
          {/* <TextField
            fullWidth
            label="Reaon"
            id="loan-desc"
            name="reason"
            onChange={onLoanFormChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
          /> */}

          <Button
            variant="contained"
            fullWidth
            sx={{ marginBottom: "30px" }}
            onClick={handleInstallmentEntrySubmit}
          >
            Submit
            {/* {loading ? <i>Sending</i> : "Submit"} */}
          </Button>
        </Box>
      </Modal>{" "}
      {/* Monthly Model */}
      <Modal
        open={monthlyModel}
        onClose={handleMonthlyClose}
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
            Monthly
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              id="monthly-date"
              onChange={(newValue) => {
                handleDateChange(newValue, "monthly");
              }}
              renderInput={(params) => (
                <TextField
                  name="date"
                  id="monthly-date"
                  {...params}
                  fullWidth
                  sx={{ marginTop: "30px" }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Select Year"
            id="year"
            name="year"
            onChange={handleMonthFormChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            // onChange={onChange}
          />
          <MonthSelect
            selecteMonth={selectedMonth}
            handleMonthChange={handleMonthChange}
            member={selectedUser}
          />
          <UserSelect
            selectedUser={selectedUser}
            value={selectedLoan}
            handleUserChange={(event) => handleUserChange(event, "monthly")}
          />
          <TextField
            fullWidth
            label="amount"
            id="monthly-amount"
            name="amount"
            defaultValue="0"
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            onChange={handleMonthFormChange}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ marginBottom: "30px" }}
            onClick={handleMonthlySubmit}
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
