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

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

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

            return {
              label: item.date,
              value: hasPersonalSavingsFund
                ? `${formatCurrency(item.loanAmount)} | Group ${formatCurrency(
                    item.groupFundAmount,
                  )} | Savings ${formatCurrency(item.personalSavingsFundAmount)}`
                : formatCurrency(item.loanAmount),
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
            value: formatCurrency(item?.amount),
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
        showWhenEmpty: true,
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
    console.log("Withdraw amount:", amount);
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

  return (
    <div id="newprofile">
      <div className="profile-container">
        {profileData && profileData.length > 0 ? (
          <div className="card">
            <div className="card-header">
              <h3>Account Information</h3>

              <div className="header-actions">
                {["admin", "operator"].includes(parsedUserRole) && (
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

                {["admin", "operator"].includes(parsedUserRole) && (
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
                savingId={profileData[0]?.savingsData?._id}
              />
            </div>

            <div className="grid">
              <Info
                label="Name"
                value={`${profileData[0].firstName} ${profileData[0].lastName}`}
              />
              <Info
                label="Eligibility"
                value={`${profileData[0].iseligible === true ? "YES" : "NO"}`}
              />
              <Info
                label="Active Since"
                value={`${profileData[0].activeSince}`}
              />
              <Info
                label="Current Share"
                value={`${profileData[0].currentShare}`}
              />
              <Info
                label="OverAll Invested"
                value={`${profileData[0]?.savingsData?.overallInvested || "-"}`}
              />
              <Info
                label="Earned Interest"
                value={`${profileData[0]?.savingsData?.earnedInterest || "-"}`}
              />
              <Info
                label="Personal Savings Balance"
                value={formatCurrency(savingsSummary.balance)}
              />
              <Info
                label="Locked In Active Loans"
                value={formatCurrency(savingsSummary.lockedAmount)}
              />
              <Info
                label="Available To Withdraw"
                value={formatCurrency(
                  typeof savingsSummary.availableBalance === "number"
                    ? savingsSummary.availableBalance
                    : savingsSummary.balance,
                )}
              />
              <Info
                label="Savings Deposits"
                value={formatCurrency(savingsSummary.totalDeposits)}
              />
              <Info
                label="Savings Debits"
                value={formatCurrency(savingsSummary.totalDebits)}
              />
            </div>
          </div>
        ) : (
          "Loading"
        )}

        <div className="card">
          <UserAccounts accountData={accountSections} />
        </div>
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

function Info({ label, value }) {
  return (
    <div className="info-item">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
}

export default LayoutAdmin(NewProfilePage, "NewProfile");
