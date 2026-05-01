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
import { createSavingsLedgerEntry } from "../../api/apiService";

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
  const [savingsTransactionType, setSavingsTransactionType] = useState("credit");
  const [savingsForm, setSavingsForm] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");

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
          accountsData.data.loans?.map((item) => ({
            label: item.date,
            value: formatCurrency(item.loanAmount),
          })) || [],
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

  const handleSavingsFormChange = (event) => {
    const { name, value } = event.target;
    setSavingsForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavingsSubmit = async () => {
    if (!activeUserId || !savingsForm.amount) return;

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

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="edit-btn"
                  disabled={!activeUserId}
                >
                  Withdraw
                </button>
                {["admin", "operator"].includes(parsedUserRole) && (
                  <>
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
                  </>
                )}
              </div>

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
              <Info label="Active Since" value={`${profileData[0].activeSince}`} />
              <Info label="Current Share" value={`${profileData[0].currentShare}`} />
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
              <button className="edit-btn secondary" onClick={closeSavingsModal}>
                Cancel
              </button>
              <button className="edit-btn" onClick={handleSavingsSubmit}>
                Submit
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
