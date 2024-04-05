import React from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";

function Accounts() {
  return (
    <div id="accounts">
      <div className="about-container">
        <p>
          We believe in being transparent about our financials. As a valuable
          donor, you have the right to garner a fair understanding of our
          incomes and investments through donations.
        </p>
        <p>Click to see the Financial Statements. </p>

        <div className="f-reports">
          <div className="monthly-reports">
            <div className="report-heading">Monthly</div>
            <div className="reports">
              <div>
                <a href="https://docs.google.com/spreadsheets/d/1ZhpGUAUX9uTIA__dDHHdLQ9nOBabPDpPyaFdvTQY7mo/edit#gid=214531015">
                  FY 2024-25
                </a>
              </div>
              <div>
                <a href="">FY 2024-25</a>
              </div>
            </div>
          </div>
          <div className="shivjayanti-reports">
            <div className="report-heading"> Shivjayanti</div>
            <div className="reports">
              <div>
                <a href="">FY 2024-25</a>
              </div>
              <div>
                <a href="">FY 2024-25</a>
              </div>
            </div>
          </div>
          <div className="annual-reports">
            <div className="report-heading">Annual Reports</div>
            <div className="reports">
              <div>
                <a href="">FY 2024-25</a>
              </div>
              <div>
                <a href="">FY 2024-25</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin(Accounts, "account");
