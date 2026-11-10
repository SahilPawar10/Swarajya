import React from "react";
import "./account.css";

const UserAccounts = ({ accountData }) => {
  return (
    <div className="user-account">
      <div className="accounts-container">
        {accountData.map((section) => (
          <div className="account-card ad-panel" key={section.title}>
            <div className="account-card-head">
              <h3>{section.title}</h3>
              <span>{section.rows.length}</span>
            </div>

            <div className="account-card-body">
              {section.rows.length > 0 ? (
                <table className="account-table">
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr key={i}>
                        <td className="date">{row.label || "-"}</td>
                        <td className="amount">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="account-card-empty">
                  {section.emptyMessage || "No records yet"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAccounts;
