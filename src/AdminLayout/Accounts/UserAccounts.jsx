import React from "react";
import "./account.css";

// const UserAccounts = ({ accountData }) => {
//   return (
//     <div className="user-account">
//       <div className="accounts-container">
//         {accountData.map((section, index) => (
//           <div className="account-card" key={index}>
//             <h3>{section.title}</h3>
//             <table>
//               <tbody>
//                 {section.rows.map((row, i) => (
//                   <tr key={i}>
//                     <td>{row.label}</td>
//                     <td>{row.value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const UserAccounts = ({ accountData }) => {
  return (
    <div className="user-account">
      <div className="accounts-container">
        {accountData.map(
          (section, index) =>
            section.rows.length > 0 && (
              <div
                className={`account-card ${section.title.toLowerCase()}`}
                key={index}
              >
                <div className="card-header">
                  <h3>{section.title}</h3>
                </div>

                <table className="account-table">
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr key={i}>
                        <td className="date">{row.label || "—"}</td>
                        <td className="amount">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserAccounts;
