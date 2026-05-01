import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionIcon from "@mui/icons-material/Description";
import InputIcon from "@mui/icons-material/Input";
import SavingsIcon from "@mui/icons-material/Savings";

import {
  addMonthlyEntry,
  adminRoles,
  approveWithDrawReq,
  createCreditEntry,
  createDebitEntry,
  createInstallmentEntry,
  createLoanEntry,
  createSavingsLedgerEntry,
  downloadSampleMonthlyFile,
  getDirectPayLoanInfo,
  getLoanRequest,
  importMonthlyFile,
  settleDirectAmount,
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
import {
  fetchActiveLoans,
  fetchContribution,
  fetchCredits,
  fetchDashBoardReport,
  fetchDebits,
  fetchInstallments,
  fetchMonthly,
  getWithdrawRequests,
} from "../../slices/acccount.slice";
import axiosInstance from "../../api/axiosInterCepter";

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

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const formatCompactCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getContributionName = (record) =>
  `${record?.user?.firstName || ""} ${record?.user?.lastName || ""}`.trim() ||
  "Member";

const getEntryDate = (date) => {
  const value = String(date || "").trim();
  const separator = value.includes("/") ? "/" : "-";
  const parts = value.split(separator);

  if (parts.length === 3) {
    const [first, second, third] = parts;
    if (first.length === 4) {
      return {
        year: Number(first),
        month: Number(second),
      };
    }

    return {
      year: Number(third.length === 2 ? `20${third}` : third),
      month: Number(second),
    };
  }

  const fallback = dayjs(date);
  return {
    year: fallback.isValid() ? fallback.year() : null,
    month: fallback.isValid() ? fallback.month() + 1 : null,
  };
};

const getFallbackYearlyOverview = (
  credits = [],
  debits = [],
  selectedYear = dayjs().year(),
) => {
  const months = [
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
  ];
  const monthData = months.map((month, index) => ({
    month: index + 1,
    label: month,
    credits: 0,
    debits: 0,
  }));

  credits.forEach((entry) => {
    const entryDate = getEntryDate(entry?.date || entry?.createdAt);
    if (entryDate.year === Number(selectedYear) && entryDate.month) {
      monthData[entryDate.month - 1].credits += Number(entry?.amount || 0);
    }
  });

  debits.forEach((entry) => {
    const entryDate = getEntryDate(entry?.date || entry?.createdAt);
    if (entryDate.year === Number(selectedYear) && entryDate.month) {
      monthData[entryDate.month - 1].debits += Number(entry?.amount || 0);
    }
  });

  return monthData;
};

const buildChartPath = (points, key, width, height, maxValue) => {
  if (!points.length) return "";

  return points
    .map((point, index) => {
      const x =
        points.length === 1 ? width : (index / (points.length - 1)) * width;
      const y = height - (Number(point[key] || 0) / maxValue) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
};

const buildAreaPath = (linePath, width, height) => {
  if (!linePath) return "";
  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
};

const formatChartTick = (value) => {
  if (value >= 100000) return `${Math.round(value / 1000)}K`;
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return String(Math.round(value));
};

const getRecentTransactions = (dashboard, credits, debits) => {
  if (dashboard?.recentTransactions?.length)
    return dashboard.recentTransactions;

  const creditEntries = credits.map((entry) => ({
    id: entry.id,
    name: entry.creditBy,
    amount: entry.amount,
    type: "Credit Entry",
    direction: "credit",
    createdAt: entry.createdAt,
    date: entry.date,
  }));
  const debitEntries = debits.map((entry) => ({
    id: entry.id,
    name: entry.debitBy,
    amount: entry.amount,
    type: "Debit Entry",
    direction: "debit",
    createdAt: entry.createdAt,
    date: entry.date,
  }));

  return [...creditEntries, ...debitEntries].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
  );
};

function AccountOverviewChart({ data, selectedYear, years, onYearChange }) {
  const [hoveredPoint, setHoveredPoint] = React.useState(null);
  const chartWidth = 620;
  const chartHeight = 300;
  const padding = { top: 12, right: 12, bottom: 34, left: 44 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const maxValue =
    Math.max(
      1,
      ...data.map((point) => Number(point.credits || 0)),
      ...data.map((point) => Number(point.debits || 0)),
    ) * 1.15;
  const getPoint = (point, index, key) => {
    const x =
      padding.left +
      (data.length === 1 ? plotWidth : (index / (data.length - 1)) * plotWidth);
    const y =
      padding.top +
      plotHeight -
      (Number(point[key] || 0) / maxValue) * plotHeight;

    return { x, y };
  };
  const buildPath = (key) =>
    data
      .map((point, index) => {
        const { x, y } = getPoint(point, index, key);
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  const creditPath = buildPath("credits");
  const debitPath = buildPath("debits");
  const debitLastPoint = getPoint(
    data[data.length - 1] || {},
    data.length - 1,
    "debits",
  );
  const debitFirstPoint = getPoint(data[0] || {}, 0, "debits");
  const debitAreaPath = `${debitPath} L ${debitLastPoint.x.toFixed(2)} ${
    padding.top + plotHeight
  } L ${debitFirstPoint.x.toFixed(2)} ${padding.top + plotHeight} Z`;
  const labels = data;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    value: maxValue * ratio,
    y: padding.top + plotHeight - ratio * plotHeight,
  }));
  const tooltipWidth = 128;
  const tooltipHeight = 42;
  const tooltipX = hoveredPoint
    ? Math.min(
        chartWidth - tooltipWidth - 8,
        Math.max(8, hoveredPoint.x - tooltipWidth / 2),
      )
    : 0;
  const tooltipY = hoveredPoint
    ? hoveredPoint.y - tooltipHeight - 14 < 8
      ? hoveredPoint.y + 14
      : hoveredPoint.y - tooltipHeight - 14
    : 0;

  return (
    <div className="ad-panel ad-overview">
      <div className="ad-panel-header">
        <h3>Account Overview</h3>
        <select
          aria-label="Account overview year"
          value={selectedYear}
          onChange={(event) => onYearChange(event.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="ad-chart-legend">
        <span className="ad-legend-credit">Credits</span>
        <span className="ad-legend-debit">Debits</span>
      </div>
      <div className="ad-chart-wrap">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img">
          <defs>
            <linearGradient id="debitFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
            </linearGradient>
          </defs>
          {yTicks.map((tick) => (
            <g key={tick.value}>
              <text x="4" y={tick.y + 4} className="ad-chart-y-label">
                {formatChartTick(tick.value)}
              </text>
              <line
                x1={padding.left}
                x2={padding.left + plotWidth}
                y1={tick.y}
                y2={tick.y}
                className="ad-chart-grid"
              />
            </g>
          ))}
          <path d={debitAreaPath} fill="url(#debitFill)" />
          <path d={creditPath} className="ad-chart-line ad-chart-credit" />
          <path d={debitPath} className="ad-chart-line ad-chart-debit" />
          {data.map((point, index) => {
            const creditPoint = getPoint(point, index, "credits");
            const debitPoint = getPoint(point, index, "debits");
            return (
              <g key={`${point.label}-${index}`}>
                <g
                  className="ad-chart-point"
                  tabIndex="0"
                  onBlur={() => setHoveredPoint(null)}
                  onFocus={() =>
                    setHoveredPoint({
                      ...creditPoint,
                      amount: point.credits,
                      label: point.label,
                      type: "Credits",
                    })
                  }
                  onMouseEnter={() =>
                    setHoveredPoint({
                      ...creditPoint,
                      amount: point.credits,
                      label: point.label,
                      type: "Credits",
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <title>{`Credits ${point.label}: ${formatCurrency(
                    point.credits,
                  )}`}</title>
                  <circle
                    cx={creditPoint.x}
                    cy={creditPoint.y}
                    r="8"
                    className="ad-chart-hit-area"
                  />
                  <circle
                    cx={creditPoint.x}
                    cy={creditPoint.y}
                    r="4"
                    className="ad-chart-dot ad-chart-dot-credit"
                  />
                </g>
                <g
                  className="ad-chart-point"
                  tabIndex="0"
                  onBlur={() => setHoveredPoint(null)}
                  onFocus={() =>
                    setHoveredPoint({
                      ...debitPoint,
                      amount: point.debits,
                      label: point.label,
                      type: "Debits",
                    })
                  }
                  onMouseEnter={() =>
                    setHoveredPoint({
                      ...debitPoint,
                      amount: point.debits,
                      label: point.label,
                      type: "Debits",
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <title>{`Debits ${point.label}: ${formatCurrency(
                    point.debits,
                  )}`}</title>
                  <circle
                    cx={debitPoint.x}
                    cy={debitPoint.y}
                    r="8"
                    className="ad-chart-hit-area"
                  />
                  <circle
                    cx={debitPoint.x}
                    cy={debitPoint.y}
                    r="4"
                    className="ad-chart-dot ad-chart-dot-debit"
                  />
                </g>
                <text
                  x={creditPoint.x}
                  y={chartHeight - 8}
                  className="ad-chart-x-label"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
          {hoveredPoint && (
            <g className="ad-chart-tooltip" pointerEvents="none">
              <rect
                x={tooltipX}
                y={tooltipY}
                width={tooltipWidth}
                height={tooltipHeight}
                rx="6"
              />
              <text
                x={tooltipX + tooltipWidth / 2}
                y={tooltipY + 17}
                className="ad-chart-tooltip-label"
              >
                {hoveredPoint.type} - {hoveredPoint.label}
              </text>
              <text
                x={tooltipX + tooltipWidth / 2}
                y={tooltipY + 33}
                className="ad-chart-tooltip-value"
              >
                {formatCurrency(hoveredPoint.amount)}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
function Accounts() {
  const [open, setOpen] = React.useState(false);
  const [debitModal, setdebitModal] = React.useState(false);
  const [loanAppModal, setloanAppModal] = React.useState(false);
  const [installmentModel, setinstallmentModel] = React.useState(false);
  const [monthlyModel, setMonthlyModel] = React.useState(false);
  const [savingsModal, setSavingsModal] = React.useState(false);
  const [savingsTransactionType, setSavingsTransactionType] =
    React.useState("credit");
  const [directPay, setdirectPayModal] = React.useState(false);
  const [directPayLoanInfo, setdirectPayLoanInfo] = React.useState();
  const [overviewYear, setOverviewYear] = React.useState(dayjs().year());
  const [overviewYears, setOverviewYears] = React.useState([dayjs().year()]);
  const [overviewData, setOverviewData] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDebitOpen = () => setdebitModal(true);
  const handleDebitClose = () => setdebitModal(false);
  const handleLoanApptClose = () => setloanAppModal(false);
  const handleDirectPayClose = () => setdirectPayModal(false);
  const handleDirectPayOpen = (id) => {
    directPayLoanData(id);
  };

  const handleInstallmentClose = () => setinstallmentModel(false);
  const handleMonthlyOpen = () => setMonthlyModel(true);
  const handleMonthlyClose = () => setMonthlyModel(false);
  const handleSavingsOpen = (transactionType) => {
    setSavingsTransactionType(transactionType);
    setSavingsForm({ transactionType });
    setSelectedUser("");
    setSavingsModal(true);
  };
  const handleSavingsClose = () => {
    setSavingsModal(false);
    setSavingsForm();
    setSelectedUser("");
  };
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

  const [loanForm, setLoanForm] = React.useState();
  const [installmentForm, setInstallmentForm] = React.useState();
  const [savingsForm, setSavingsForm] = React.useState();
  const [yourContribution, setYourContribution] = useState([]);

  // const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMontlyUser, setselectedMontlyUser] = useState("");

  const [filterType, setFilterType] = React.useState("all");

  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const contribution = useSelector((state) => state.accounts.contribution);
  const dashReport = useSelector((state) => state.accounts.dashboard);

  const creditsData = useSelector((state) => state.accounts.credits);
  const debitsData = useSelector((state) => state.accounts.debits);
  const monthlyData = useSelector((state) => state.accounts.monthly);
  const installmentData = useSelector((state) => state.accounts.installments);
  const activeLoansData = useSelector((state) => state.accounts.activeLoans);
  const withdrawReqData = useSelector((state) => state.accounts.withdrawReq);

  // const [dashReport, setdashReport] = React.useState({
  //   balance: 0,
  //   credits: 0,
  //   debits: 0,
  //   loan: 0,
  //   monthly: [],
  // });

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
    } else if (form === "savings") {
      setSavingsForm((prevState) => ({
        ...prevState,
        userId: value,
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
    } else if (form === "savings") {
      setSavingsForm((prev) => ({
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

  const onSavingsChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSavingsForm((prevState) => ({
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

  const handleSavingsEntrySubmit = async () => {
    const payload = {
      ...savingsForm,
      transactionType: savingsTransactionType,
      date: savingsForm?.date || selectedDate.format("DD-MM-YYYY"),
      userId: savingsForm?.userId || selectedUser,
    };

    if (!payload.userId || !payload.amount) {
      setSnack({
        open: true,
        message: "Please select user and enter amount.",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    await createSavingsLedgerEntry(payload)
      .then(() => {
        setLoading(false);
        setSnack({
          open: true,
          message: "Personal savings entry added successfully!",
          severity: "success",
        });
        handleSavingsClose();
        dashboardReport();
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
        setSnack({
          open: true,
          message: err?.response?.data?.message || "something went wrong",
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
          new Blob([res.data], { type: "application/pdf" }),
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

  const handlesettleDirectAmount = async (id) => {
    if (!id) return;
    setLoading(true);
    const data = {
      id: id,
    };
    console.log(data, "data");

    settleDirectAmount(data)
      .then((res) => {
        setLoading(false);
        setdirectPayModal(false);
        // console.log(res.data, "installments");
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
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
      getAllWithdrawReq();
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
    dispatch(fetchCredits());
  };

  const getAllDebits = async () => {
    dispatch(fetchDebits());
    // setRole("admin");
  };

  const getAllMonthly = async () => {
    dispatch(fetchMonthly());
  };

  const getAllInstallMentRcords = async () => {
    dispatch(fetchInstallments());
  };

  const getLoanSummary = async () => {
    dispatch(fetchActiveLoans());
  };
  const loanPrequests = async () => {
    getLoanRequest()
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => console.log(err, "err"));
  };

  const dashboardReport = async () => {
    dispatch(fetchDashBoardReport());
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
    if (!data?.length) {
      setSnack({
        open: true,
        message: "No data available to download.",
        severity: "warning",
      });
      return;
    }

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

  const downloadTopContributors = (contributors) => {
    const rows = contributors.map((record, index) => ({
      Rank: index + 1,
      Name: getContributionName(record),
      Amount: Number(record.totalAmount || 0),
    }));

    exportDataDownload(rows, "top-contributors.xlsx");
  };

  const downloadRecentTransactions = (transactions) => {
    const rows = transactions.map((transaction, index) => ({
      SrNo: index + 1,
      Date: transaction.date || transaction.createdAt || "",
      Name: transaction.name || "Transaction",
      Type: transaction.type || "",
      Direction: transaction.direction || "credit",
      Amount: Number(transaction.amount || 0),
    }));

    exportDataDownload(rows, "recent-transactions.xlsx");
  };

  const handleExcelUpload = (files) => {
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
    dispatch(fetchContribution());
    const user = contribution?.filter((item) => item.user.id === userId);
    // console.log("currUSer", user, userId);
  };

  const getAllWithdrawReq = async () => {
    dispatch(getWithdrawRequests());
  };

  const getYearlyOverview = async (year) => {
    try {
      const res = await axiosInstance.get(
        `/loan/dashboard/yearly-overview?year=${year}`,
      );
      setOverviewData(res.data?.data || []);
      setOverviewYear(res.data?.year || Number(year));
      setOverviewYears(
        res.data?.years?.length ? res.data.years : [Number(year)],
      );
    } catch (error) {
      console.error(error);
    }
  };

  const approveWithDrawRequest = async (id) => {
    approveWithDrawReq({ withdrawId: id })
      .then((res) => {
        setSnack({
          open: true,
          message: "Request approved successfully!",
          severity: "success",
        });
        getAllWithdrawReq();
      })
      .catch((err) => console.log(err));
  };

  const directPayLoanData = async (id) => {
    setLoading(true);
    const data = {
      id: id,
    };
    getDirectPayLoanInfo(data)
      .then((res) => {
        setLoading(false);
        setdirectPayModal(true);
        // console.log(res.data, "installments");
        setdirectPayLoanInfo(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
  };

  const filterdMonthlyData = monthlyData?.filter((item) => {
    const matchMonth = selectedMonth ? item.month === selectedMonth : true;
    const matchYear = selectedYear
      ? item.year?.toString() === selectedYear
      : true;

    const matchUser = selectedMontlyUser
      ? item?.member?.firstName + " " + item?.member?.lastName ===
        selectedMontlyUser
      : true;
    return matchMonth && matchYear && matchUser;
  });

  const filteredCreditData = React.useMemo(() => {
    if (filterType === "monthly") {
      return creditsData.filter((item) =>
        item?.desc?.toLowerCase().startsWith("monthly"),
      );
    }
    if (filterType === "sound") {
      return creditsData.filter((item) =>
        item?.desc?.toLowerCase().startsWith("sound"),
      );
    }
    if (filterType === "installment") {
      return creditsData.filter((item) =>
        item?.desc?.toLowerCase().startsWith("installment"),
      );
    }
    if (filterType === "other") {
      return creditsData.filter(
        (item) =>
          !(
            item?.desc?.toLowerCase().startsWith("monthly") ||
            item?.desc?.toLowerCase().startsWith("sound") ||
            item?.desc?.toLowerCase().startsWith("installment")
          ),
      );
    }
    return creditsData;
  }, [creditsData, filterType]);

  useEffect(() => {
    setUser();
    if (!contribution || contribution.length === 0) {
      getContribution();
    }
    if (!dashReport || dashReport.length === 0) {
      dashboardReport();
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId && contribution?.length > 0) {
      const filtered = contribution.filter((item) => item.user._id === userId);
      setYourContribution(filtered);
    }
  }, [userId, contribution]);

  useEffect(() => {
    if (dashReport?.yearlyOverview) {
      setOverviewData(dashReport.yearlyOverview.data || []);
      setOverviewYear(dashReport.yearlyOverview.year || dayjs().year());
      setOverviewYears(
        dashReport.yearlyOverview.years?.length
          ? dashReport.yearlyOverview.years
          : [dashReport.yearlyOverview.year || dayjs().year()],
      );
    }
  }, [dashReport]);

  const hasDashboardTrend =
    overviewData?.some(
      (point) =>
        Number(point.credits || 0) > 0 || Number(point.debits || 0) > 0,
    ) || false;
  const dashboardTrend = hasDashboardTrend
    ? overviewData
    : getFallbackYearlyOverview(creditsData, debitsData, overviewYear);
  const dashboardContributors =
    dashReport?.topContributors?.length > 0
      ? dashReport.topContributors
      : contribution;
  const recentTransactions = getRecentTransactions(
    dashReport,
    creditsData,
    debitsData,
  );
  const monthlySummary = dashReport?.monthlySummary || {};
  const userContributionTotal = yourContribution[0]?.totalAmount || 0;
  const summaryCards = [
    {
      title: "Available Balance",
      value: dashReport?.totalBalance,
      note: "Available to use",
      tone: "green",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      title: "Total Credits",
      value: dashReport?.overAllCredits,
      note: "Overall credits",
      tone: "amber",
      icon: <ArrowOutwardIcon />,
    },
    {
      title: "Total Debits",
      value: dashReport?.overAllDebits,
      note: "Overall debits",
      tone: "rose",
      icon: <CloseIcon />,
    },
    {
      title: "Total Loanouts",
      value: dashReport?.totalLoanuts,
      note: "Total loan given",
      tone: "violet",
      icon: <SavingsIcon />,
    },
  ];
  const savingsCards = [
    {
      title: "Personal Savings Balance",
      value: dashReport?.personalSavingBalance,
      note: "Total Balance",
      tone: "green",
      icon: <SavingsIcon />,
    },
    {
      title: "Personal Savings Deposits",
      value: dashReport?.personalSavingDeposits,
      note: "Total Deposits",
      tone: "blue",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      title: "Personal Savings Debits",
      value: dashReport?.personalSavingDebits,
      note: "Total Debits",
      tone: "orange",
      icon: <CreditCardIcon />,
    },
  ];
  const actionCards = [
    {
      title: "Loan Application",
      label: "Apply Now",
      tone: "blue",
      icon: <DescriptionIcon />,
      onClick: handleLoanAppOpen,
      visible: true,
    },
    {
      title: "Credit Entry",
      label: "Add Credit",
      tone: "green",
      icon: <InputIcon />,
      onClick: handleOpen,
      visible: adminRoles.includes(role),
    },
    {
      title: "Debit Entry",
      label: "Add Debit",
      tone: "orange",
      icon: <CreditCardIcon />,
      onClick: handleDebitOpen,
      visible: adminRoles.includes(role),
    },
    {
      title: "Savings Credit",
      label: "Add Deposit",
      tone: "green",
      icon: <SavingsIcon />,
      onClick: () => handleSavingsOpen("credit"),
      visible: adminRoles.includes(role),
    },
    {
      title: "Savings Debit",
      label: "Add Debit",
      tone: "rose",
      icon: <CreditCardIcon />,
      onClick: () => handleSavingsOpen("debit"),
      visible: adminRoles.includes(role),
    },
    {
      title: "View Reports",
      label: "View Details",
      tone: "violet",
      icon: <DescriptionIcon />,
      onClick: () => setValue(1),
      visible: true,
    },
  ].filter((item) => item.visible);

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
            <Tab label="Active Loan" {...a11yProps(6)} />
            {role !== "user" && <Tab label="Widrawals" {...a11yProps(7)} />}
          </Tabs>
        </Box>
        {/* DashBoard */}
        <CustomTabPanel value={value} index={0}>
          <div className="account-dashboard-v2">
            <div className="ad-summary-grid">
              {summaryCards.map((card) => (
                <div className="ad-summary-card" key={card.title}>
                  <div className={`ad-icon ad-${card.tone}`}>{card.icon}</div>
                  <div>
                    <p>{card.title}</p>
                    <strong>{formatCurrency(card.value)}</strong>
                    <span>{card.note}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ad-dashboard-grid">
              <AccountOverviewChart
                data={dashboardTrend}
                selectedYear={overviewYear}
                years={overviewYears}
                onYearChange={getYearlyOverview}
              />

              <div className="ad-panel ad-actions">
                <div className="ad-panel-header">
                  <h3>Quick Actions</h3>
                </div>
                <div className="ad-action-grid">
                  {actionCards.map((action) => (
                    <button
                      className={`ad-action-card ad-action-${action.tone}`}
                      key={action.title}
                      type="button"
                      onClick={action.onClick}
                    >
                      <span className={`ad-action-icon ad-${action.tone}`}>
                        {action.icon}
                      </span>
                      <strong>{action.title}</strong>
                      <small>
                        {action.label} <CallMadeIcon />
                      </small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ad-panel ad-list-panel ad-contributors">
                <div className="ad-panel-header">
                  <h3>Top Contributors</h3>
                  <button
                    type="button"
                    onClick={() =>
                      downloadTopContributors(dashboardContributors)
                    }
                  >
                    View All
                  </button>
                </div>
                <div className="ad-ranked-list">
                  {dashboardContributors.map((record, index) => {
                    const name = getContributionName(record);
                    return (
                      <div className="ad-ranked-row" key={`${name}-${index}`}>
                        <span>{index + 1}</span>
                        <strong>{name}</strong>
                        <b>{formatCurrency(record.totalAmount)}</b>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="ad-savings-grid">
                {savingsCards.map((card) => (
                  <div className="ad-saving-card" key={card.title}>
                    <div className={`ad-icon ad-${card.tone}`}>{card.icon}</div>
                    <p>{card.title}</p>
                    <strong>{formatCurrency(card.value)}</strong>
                    <span>{card.note}</span>
                  </div>
                ))}
              </div>

              <div className="ad-panel ad-list-panel ad-recent">
                <div className="ad-panel-header">
                  <h3>Recent Transactions</h3>
                  <button
                    type="button"
                    onClick={() =>
                      downloadRecentTransactions(recentTransactions)
                    }
                  >
                    View All
                  </button>
                </div>
                <div className="ad-transaction-list">
                  {recentTransactions.map((transaction, index) => {
                    const isCredit = transaction.direction !== "debit";
                    return (
                      <div
                        className="ad-transaction-row"
                        key={transaction.id || `${transaction.name}-${index}`}
                      >
                        <span
                          className={`ad-avatar ${isCredit ? "credit" : "debit"}`}
                        >
                          {getInitials(transaction.name)}
                        </span>
                        <div>
                          <strong>{transaction.name || "Transaction"}</strong>
                          <small>{transaction.type}</small>
                        </div>
                        <b className={isCredit ? "positive" : "negative"}>
                          {isCredit ? "" : "-"}
                          {formatCurrency(transaction.amount)}
                        </b>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="ad-panel ad-monthly-summary">
                <div className="ad-panel-header">
                  <h3>Monthly Summary</h3>
                </div>
                <div className="ad-monthly-values">
                  <div>
                    <span>Total Credits</span>
                    <strong>
                      {formatCurrency(monthlySummary.totalCredits)}
                    </strong>
                    <small>
                      {monthlySummary.month || dayjs().format("MMM")}
                    </small>
                  </div>
                  <div>
                    <span>Total Debits</span>
                    <strong>
                      {formatCurrency(monthlySummary.totalDebits)}
                    </strong>
                    <small>{monthlySummary.year || dayjs().year()}</small>
                  </div>
                  <div>
                    <span>Net Balance</span>
                    <strong>{formatCurrency(monthlySummary.netBalance)}</strong>
                    <small
                      className={
                        Number(monthlySummary.netBalance || 0) >= 0
                          ? "positive"
                          : "negative"
                      }
                    >
                      {formatCompactCurrency(userContributionTotal)} personal
                    </small>
                  </div>
                  <div>
                    <span>Active Loanouts</span>
                    <strong>
                      {formatCurrency(monthlySummary.totalLoanouts)}
                    </strong>
                    <button type="button" onClick={() => setValue(5)}>
                      View Details
                    </button>
                  </div>
                </div>
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
                {/* Filter Dropdown */}
                <div style={{ marginBottom: "10px" }}>
                  <select
                    style={{ height: "33px", marginLeft: "17px" }}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="monthly">Monthly</option>
                    <option value="sound">Sound</option>
                    <option value="installment">Installments</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {role !== "user" && (
                  <div className="tab-buttons">
                    <div className="button-group-loan">
                      <button className="btn-loan approve" onClick={handleOpen}>
                        Add Credit
                      </button>
                      <button
                        className="btn-loan reject"
                        onClick={() =>
                          exportDataDownload(creditsData, "creditEntry.xlsx")
                        }
                      >
                        Export
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
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCreditData?.map((c, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td className="blue-link">{c?.date}</td>
                          <td>
                            <span className={`status ${"client"}`}>
                              {c?.amount} &#8377;
                            </span>
                          </td>
                          <td className="bold-score">{c.creditBy || "-"}</td>
                          <td>{c?.desc || "-"}</td>
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
                        exportDataDownload(debitsData, "debitEntry.xlsx");
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
                    {debitsData?.map((c, i) => (
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
                      "Sept",
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
                    {[...new Set(monthlyData.map((c) => c.year))]
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
                        monthlyData.map(
                          (c) =>
                            c?.member?.firstName + " " + c?.member?.lastName,
                        ),
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
                            filterdMonthyData(monthlyData),
                            "monthly.xlsx",
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
                    {filterdMonthlyData.map((c, i) => (
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
                          filterdInstallmentData(installmentData),
                          "installment.xlsx",
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
                    {installmentData.map((c, i) => (
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
                      <th>Id</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Loan Amount</th>
                      <th>Min Paybale</th>
                      <th>EMI</th>
                      <th>Total Paybale</th>
                      <th>Total Paid</th>
                      <th>remains</th>
                      <th>Days</th>
                      <th>%</th>
                      <th>status</th>
                      <th>reason</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeLoansData.map((c, i) => (
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
                        {c?.status !== "paid" && Number(c?.emi) ? (
                          <td>
                            <button
                              class="btn-loan approve"
                              onClick={() => {
                                handleDirectPayOpen(c.id);
                              }}
                            >
                              Direct Pay
                            </button>
                          </td>
                        ) : (
                          <td>-</td>
                        )}
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
                    <th> Amount</th>
                    {/* <th>Total Payble</th>
                    <th>Percentage</th>
                    <th>reason</th>
                    <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {withdrawReqData.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c?.date || "-"}</td>
                      {/* <td>{c.loanId.id}</td> */}

                      <td>{c?.username || "-"}</td>
                      <td>{c?.amount || "-"}</td>
                      {/* <td>{c?.totalPaybale || "-"}</td>
                      <td>{c?.percentage || "-"}</td>
                      <td>{c?.reason}</td> */}
                      <td>
                        <div class="button-group-loan">
                          <button
                            class="btn-loan approve"
                            onClick={() => {
                              approveWithDrawRequest(c.id);
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
      {/* Personal Savings Modal */}
      <Modal
        open={savingsModal}
        onClose={handleSavingsClose}
        aria-labelledby="personal-savings-title"
        aria-describedby="personal-savings-description"
      >
        <Box sx={style}>
          <Typography
            id="personal-savings-title"
            sx={{
              mt: 1,
              textAlign: "center",
              fontSize: "26px",
              color: "blueviolet",
              fontWeight: "800",
            }}
          >
            {savingsTransactionType === "credit"
              ? "Personal Savings Credit"
              : "Personal Savings Debit"}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              id="savings-date"
              onChange={(newValue) => {
                handleDateChange(newValue, "savings");
              }}
              renderInput={(params) => (
                <TextField
                  name="date"
                  id="savings-date"
                  {...params}
                  fullWidth
                  sx={{ marginTop: "30px" }}
                />
              )}
            />
          </LocalizationProvider>
          <Box sx={{ marginTop: "10px", marginBottom: "20px" }}>
            <UserSelect
              selectedUser={selectedUser}
              handleUserChange={(event) => handleUserChange(event, "savings")}
            />
          </Box>
          <TextField
            fullWidth
            label="Amount"
            id="savings-amount"
            name="amount"
            type="number"
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            onChange={onSavingsChange}
          />
          <TextField
            fullWidth
            label="Description"
            id="savings-desc"
            name="desc"
            onChange={onSavingsChange}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ marginBottom: "30px" }}
            onClick={handleSavingsEntrySubmit}
          >
            {loading ? "Saving" : "Submit"}
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

            {/* Percentage Note */}
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "#f5f7ff",
                  border: "1px solid #d6ddff",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  fontSize: "13px",
                  color: "#2b3a67",
                }}
              >
                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                  Percentage slabs (Internal members)
                </Typography>
                <Typography sx={{ fontSize: "13px", lineHeight: 1.6 }}>
                  Amount ≤ 5,000: 3%
                  <br />
                  Amount ≤ 10,000: 2.5%
                  <br />
                  Amount ≤ 25,000: 2%
                  <br />
                  Amount ≤ 50,000: 1%
                </Typography>
                <Typography sx={{ fontSize: "13px", lineHeight: 1.6, mt: 1 }}>
                  Note: External members should be charged 5% or higher (as
                  discussed).
                </Typography>
              </Box>
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
      {/* Direct Pay */}
      <Modal
        open={directPay}
        onClose={handleDirectPayClose}
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
            Settle Direct
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Date Picker */}
            {/* Loan Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                name="loanAmount"
                value={directPayLoanInfo?.date}
                // onChange={onLoanFormChange}
              />
            </Grid>

            {/* Percentage */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Percentage"
                name="percentage"
                value={directPayLoanInfo?.name}
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="totalRemaining"
                name="totalRemaining"
                value={directPayLoanInfo?.totalRemaining}
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="totalPaybale"
                name="duration"
                value={directPayLoanInfo?.totalPaybale}
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Reason */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="duration"
                name="duration"
                value={directPayLoanInfo?.duration}
                onChange={onLoanFormChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: "30px" }}
                onClick={() => {
                  handlesettleDirectAmount(directPayLoanInfo?.id);
                }}
              >
                {loading ? "Sending" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
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
