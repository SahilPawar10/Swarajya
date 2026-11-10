import React, { useEffect, useMemo, useState } from "react";
import "./newprofile.css";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getUserAccountsDetails,
  getUserSavingsData,
} from "../../slices/acccount.slice";
import UserAccounts from "../Accounts/UserAccounts";
import WithdrawModal from "../Accounts/WithdrawModal ";
import {
  createSavingsLedgerEntry,
  downloadUserAccountStatement,
  resetUserPassword,
} from "../../api/apiService";
import { SummaryCard } from "../Accounts/AdminOverview";
import { formatCurrency, formatPercent } from "../../utils/common";
import dayjs from "dayjs";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PaymentsIcon from "@mui/icons-material/Payments";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";


const getToday = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function NewProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingsModal, setSavingsModal] = useState(false);
  const [savingsTransactionType, setSavingsTransactionType] =
    useState("credit");
  const [savingsForm, setSavingsForm] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [profileMessage, setProfileMessage] = useState("");

  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.accounts.savingsData);
  const accountsData = useSelector((state) => state.accounts.accountsData);
  const usersData = useSelector((state) => state.accounts.users);

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const parsedUserId = JSON.parse(userId);
  const parsedUserRole = JSON.parse(userRole);
  const activeUserId = selectedUserId || parsedUserId;
  const savingsSummary = accountsData?.data?.savings || {};
  const earningsSummary = accountsData?.data?.earningsSummary || {};
  const overallInvested = (accountsData?.data?.monthly || []).reduce(
    (total, item) => total + Number(item.amount || 0),
    0,
  );

  const accountSections = useMemo(() => {
    if (!accountsData || Object.keys(accountsData).length === 0) {
      return [];
    }

    return [
      {
        title: "Monthly",
        rows:
          accountsData.data.monthly?.map((item) => ({
            label: item.date,
            value: formatCurrency(item.amount),
          })) || [],
      },
      {
        title: "Loans",
        rows:
          accountsData.data.loans?.map((item) => {
            const hasPersonalSavingsFund =
              Number(item.personalSavingsFundAmount || 0) > 0;
            const terms = `${formatPercent(item.percentage)}${
              item.emi ? ` | EMI ${formatCurrency(item.emi)}` : ""
            }`;

            return {
              label: item.date,
              value: hasPersonalSavingsFund
                ? `${formatCurrency(item.loanAmount)} | ${terms} | Group ${formatCurrency(
                    item.groupFundAmount,
                  )} | Savings ${formatCurrency(item.personalSavingsFundAmount)}`
                : `${formatCurrency(item.loanAmount)} | ${terms}`,
            };
          }) || [],
      },
      {
        title: "Installments",
        rows:
          accountsData.data.installment?.map((item) => ({
            label: item.date,
            value: formatCurrency(item.paidAmount),
          })) || [],
      },
      {
        title: "Earnings",
        rows:
          accountsData.data.earning?.map((item) => ({
            label: item.date,
            value: formatCurrency(item.amount),
          })) || [],
      },
      {
        title: "Withdraws",
        rows:
          accountsData.data.withdraws?.map((item) => ({
            label: item?.date,
            value: `${formatCurrency(item?.amount)} | ${
              item?.status === "success" ? "Paid" : item?.status || "-"
            }`,
          })) || [],
      },
      {
        title: "Savings Deposits",
        rows:
          accountsData.data.savings?.deposits?.map((item) => ({
            label: item?.date,
            value: formatCurrency(item?.amount),
          })) || [],
      },
      {
        title: "Locked Savings",
        emptyMessage: "No savings locked in active loans",
        rows:
          accountsData.data.savings?.lockedLoans?.map((item) => ({
            label: `${item?.date || "-"} ${item?.borrowerName || "Loan"}`,
            value: `${formatCurrency(item?.lockedAmount)} locked in ${formatCurrency(
              item?.loanAmount,
            )}`,
          })) || [],
      },
      {
        title: "Savings Debits",
        rows:
          accountsData.data.savings?.debits?.map((item) => ({
            label: item?.date,
            value: formatCurrency(item?.amount),
          })) || [],
      },
    ];
  }, [accountsData]);

  useEffect(() => {
    dispatch(getUserSavingsData(activeUserId));
    dispatch(getUserAccountsDetails(activeUserId));

    if (["admin", "operator"].includes(parsedUserRole)) {
      dispatch(getAllUsers());
    }
  }, [dispatch, activeUserId, parsedUserRole]);

  const handleWithdraw = (amount) => {
    setProfileMessage(
      `Withdraw request for ${formatCurrency(amount)} sent for approval.`,
    );
    dispatch(getUserAccountsDetails(activeUserId));
  };

  const handleUserChange = (currUserId) => {
    setSelectedUserId(currUserId);

    if (!currUserId) return;
    dispatch(getUserAccountsDetails(currUserId));
    dispatch(getUserSavingsData(currUserId));
  };

  const openSavingsModal = (transactionType) => {
    setSavingsTransactionType(transactionType);
    setSavingsForm({ date: getToday() });
    setSavingsModal(true);
  };

  const closeSavingsModal = () => {
    setSavingsModal(false);
    setSavingsForm({});
  };

  const closeResetPasswordModal = () => {
    setResetPasswordModal(false);
    setPasswordForm({ password: "", confirmPassword: "" });
  };

  const handleSavingsFormChange = (event) => {
    const { name, value } = event.target;
    setSavingsForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavingsSubmit = async () => {
    if (!activeUserId || !savingsForm.amount) return;

    try {
      await createSavingsLedgerEntry({
        userId: activeUserId,
        amount: savingsForm.amount,
        transactionType: savingsTransactionType,
        desc: savingsForm.desc,
        date: savingsForm.date || getToday(),
      });

      closeSavingsModal();
      dispatch(getUserAccountsDetails(activeUserId));
      dispatch(getUserSavingsData(activeUserId));
    } catch (err) {
      alert(err?.response?.data?.message || "Unable to save savings entry");
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPasswordSubmit = async () => {
    if (!activeUserId) return;

    if (passwordForm.password !== passwordForm.confirmPassword) {
      setProfileMessage("Password and confirm password do not match");
      return;
    }

    if (
      passwordForm.password.length < 6 ||
      !/\d/.test(passwordForm.password) ||
      !/[a-zA-Z]/.test(passwordForm.password)
    ) {
      setProfileMessage(
        "Password must be at least 6 characters and include 1 letter and 1 number",
      );
      return;
    }

    try {
      await resetUserPassword(activeUserId, {
        password: passwordForm.password,
      });
      closeResetPasswordModal();
      setProfileMessage("Password reset successfully.");
    } catch (err) {
      setProfileMessage(
        err?.response?.data?.message || "Unable to reset password",
      );
    }
  };

  const handleDownloadStatement = async () => {
    if (!activeUserId) return;

    const res = await downloadUserAccountStatement(activeUserId);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    const profileName = profileData?.[0]
      ? `${profileData[0].firstName}_${profileData[0].lastName}`
      : "account";

    link.href = url;
    link.download = `${profileName}_account_statement.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const profile = profileData?.[0];
  const isStaff = ["admin", "operator"].includes(parsedUserRole);
  const summaryCards = [
    { title: "Overall Invested", value: formatCurrency(overallInvested), note: "Monthly contributions", tone: "blue", icon: <TrendingUpIcon /> },
    { title: "Earned Interest", value: formatCurrency(earningsSummary.netBalance), note: "After withdrawals", tone: "green", icon: <PaymentsIcon /> },
    { title: "Available To Withdraw", value: formatCurrency(earningsSummary.availableToWithdraw), note: "After pending requests", tone: "amber", icon: <AccountBalanceWalletIcon /> },
    { title: "Personal Savings", value: formatCurrency(savingsSummary.balance), note: "Deposits minus debits", tone: "violet", icon: <SavingsIcon /> },
    { title: "Locked In Loans", value: formatCurrency(savingsSummary.lockedAmount), note: "Savings funding active loans", tone: "rose", icon: <LockIcon /> },
    {
      title: "Available Savings",
      value: formatCurrency(
        typeof savingsSummary.availableBalance === "number"
          ? savingsSummary.availableBalance
          : savingsSummary.balance,
      ),
      note: "Not locked in loans",
      tone: "green",
      icon: <LockOpenIcon />,
    },
    { title: "Savings Deposits", value: formatCurrency(savingsSummary.totalDeposits), note: "Total deposited", tone: "blue", icon: <AddCircleOutlineIcon /> },
    { title: "Savings Debits", value: formatCurrency(savingsSummary.totalDebits), note: "Total debited", tone: "orange", icon: <RemoveCircleOutlineIcon /> },
  ];

  return (
    <div id="newprofile">
      <div className="profile-container">
        {profile ? (
          <>
            <section className="pa-hero ad-panel">
              <div className="pa-identity">
                <span className="pa-avatar">
                  {`${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`}
                </span>
                <div className="pa-identity-text">
                  <h2>
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <div className="pa-tags">
                    <span className={`pa-tag ${profile.iseligible === true ? "pa-tag-yes" : "pa-tag-no"}`}>
                      {profile.iseligible === true ? "Eligible" : "Not eligible"}
                    </span>
                    <span className="pa-tag">Share {profile.currentShare}%</span>
                    <span className="pa-tag">
                      Active since {dayjs(profile.activeSince).format("D MMM YYYY")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="header-actions">
                {isStaff && (
                  <select
                    className="user-select"
                    value={selectedUserId}
                    onChange={(e) => handleUserChange(e.target.value)}
                  >
                    <option value="">Select User</option>
                    {usersData.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </select>
                )}

                <div className="profile-action-group">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="edit-btn"
                    disabled={!activeUserId}
                  >
                    Withdraw
                  </button>
                  <button
                    onClick={handleDownloadStatement}
                    className="edit-btn statement-btn"
                    disabled={!activeUserId}
                  >
                    Statement
                  </button>
                </div>

                {isStaff && (
                  <div className="profile-action-group admin-actions">
                    <button
                      onClick={() => openSavingsModal("credit")}
                      className="edit-btn savings-credit"
                      disabled={!activeUserId}
                    >
                      Savings Credit
                    </button>
                    <button
                      onClick={() => openSavingsModal("debit")}
                      className="edit-btn savings-debit"
                      disabled={!activeUserId}
                    >
                      Savings Debit
                    </button>
                    <button
                      onClick={() => setResetPasswordModal(true)}
                      className="edit-btn reset-password-btn"
                      disabled={!activeUserId}
                    >
                      Reset Password
                    </button>
                  </div>
                )}
              </div>

              {profileMessage && (
                <div className="profile-message">{profileMessage}</div>
              )}

              <WithdrawModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleWithdraw}
                userId={activeUserId}
                available={earningsSummary.availableToWithdraw}
              />
            </section>

            <h3 className="pa-section-title">Account Summary</h3>
            <div className="ad-summary-grid">
              {summaryCards.map((card) => (
                <SummaryCard key={card.title} {...card} />
              ))}
            </div>
          </>
        ) : (
          <p className="pa-loading">Loading account...</p>
        )}

        <h3 className="pa-section-title">Account History</h3>
        <UserAccounts accountData={accountSections} />
      </div>

      {savingsModal && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal">
            <h3>
              {savingsTransactionType === "credit"
                ? "Personal Savings Credit"
                : "Personal Savings Debit"}
            </h3>
            <label>
              Date
              <input
                name="date"
                value={savingsForm.date || ""}
                onChange={handleSavingsFormChange}
                placeholder="DD-MM-YYYY"
              />
            </label>
            <label>
              Amount
              <input
                name="amount"
                type="number"
                value={savingsForm.amount || ""}
                onChange={handleSavingsFormChange}
              />
            </label>
            <label>
              Description
              <textarea
                name="desc"
                value={savingsForm.desc || ""}
                onChange={handleSavingsFormChange}
              />
            </label>
            <div className="profile-modal-actions">
              <button
                className="edit-btn secondary"
                onClick={closeSavingsModal}
              >
                Cancel
              </button>
              <button className="edit-btn" onClick={handleSavingsSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {resetPasswordModal && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal">
            <h3>Reset User Password</h3>
            <label>
              New Password
              <input
                name="password"
                type="password"
                value={passwordForm.password}
                onChange={handlePasswordChange}
              />
            </label>
            <label>
              Confirm Password
              <input
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <div className="profile-modal-actions">
              <button
                className="edit-btn secondary"
                onClick={closeResetPasswordModal}
              >
                Cancel
              </button>
              <button
                className="edit-btn reset-password-btn"
                onClick={handleResetPasswordSubmit}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LayoutAdmin(NewProfilePage, "NewProfile");
