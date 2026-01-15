import React, { useEffect, useMemo, useState } from "react";
import "./newprofile.css";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getUserAccountsDetails,
  getUserProfile,
  getUserSavingsData,
  getUsersData,
} from "../../slices/acccount.slice";
import UserAccounts from "../Accounts/UserAccounts";
import WithdrawModal from "../Accounts/WithdrawModal ";
import { logDOM } from "@testing-library/react";

function NewProfilePage() {
  // eslint-disable-next-line no-undef
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState("");

  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.accounts.savingsData);
  const accountsData = useSelector((state) => state.accounts.accountsData);
  const usersData = useSelector((state) => state.accounts.users);

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

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
            value: `₹ ${item.amount}`,
          })) || [],
      },
      {
        title: "Loans",
        rows:
          accountsData.data.loans?.map((item) => ({
            label: item.date,
            value: `₹ ${item.loanAmount}`,
          })) || [],
      },
      {
        title: "Installments",
        rows:
          accountsData.data.installment?.map((item) => ({
            label: item.date,
            value: `₹ ${item.paidAmount}`,
          })) || [],
      },
      {
        title: "Earnings",
        rows:
          accountsData.data.earning?.map((item) => ({
            label: item.date,
            value: `₹ ${item.amount}`,
          })) || [],
      },
      {
        title: "Withdraws",
        rows:
          accountsData.data.withdraws?.map((item) => ({
            label: item?.date,
            value: `₹ ${item?.amount}`,
          })) || [],
      },
    ];
  }, [accountsData]);
  useEffect(() => {
    if (!profileData || profileData.length === 0) {
      dispatch(getUserSavingsData(JSON.parse(userId)));
    }

    if (!accountsData || accountsData.length === 0) {
      dispatch(getUserAccountsDetails(JSON.parse(userId)));
    }

    if (["admin", "operator"].includes(JSON.parse(userRole))) {
      dispatch(getAllUsers());
    }
  }, [dispatch, userId, accountsData]);

  const handleWithdraw = (amount) => {
    console.log("Withdraw amount:", amount);
    // Call API or dispatch action here
  };

  const handleUserChange = (currUserId) => {
    setSelectedUserId(currUserId);
    console.log(currUserId, "curruserid");

    if (!currUserId) return;
    dispatch(getUserAccountsDetails(currUserId));
    dispatch(getUserSavingsData(currUserId));
  };

  return (
    <div id="newprofile">
      <div className="profile-container">
        {/* <h2 className="page-title">My Profile</h2> */}
        {/* Personal Information */}
        {profileData && profileData.length > 0 ? (
          <div className="card">
            {/* <div className="card-header">
              <h3>Account Information</h3>
              <button onClick={() => setIsModalOpen(true)} className="edit-btn">
                Withdraw
              </button>

              
              <WithdrawModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleWithdraw}
                savingId={profileData[0].savingsData?._id}
              />
            </div> */}
            <div className="card-header">
              <h3>Account Information</h3>

              <div className="header-actions">
                <select
                  className="user-select"
                  value={selectedUserId}
                  onChange={(e) => handleUserChange(e.target.value)}
                >
                  <option value="">Select User</option>
                  {usersData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="edit-btn"
                  disabled={!selectedUserId} // optional
                >
                  Withdraw
                </button>
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
                value={`${
                  profileData[0].firstName + " " + profileData[0].lastName
                }`}
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
              {/* <Info label="User Role" value="Admin" /> */}
            </div>
          </div>
        ) : (
          "Loading"
        )}

        {/* Address */}
        <div className="card">
          <UserAccounts accountData={accountSections} />
        </div>
      </div>
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
