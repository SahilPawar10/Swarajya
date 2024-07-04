import React from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";

function Accounts() {
  return (
    <div id="accounts">
      <div className="about-container">
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
                <a href="https://docs.google.com/spreadsheets/d/1NLAfqo1T52y6fXhj2DJLmTXvjqspOA8HEE9qFDXfcqM/edit?usp=sharing">
                  FY 2024-25
                </a>
              </div>
              <div>
                <a href="">FY 2024-25</a>
              </div>
            </div>
          </div>
          <div className="annual-reports">
            <div className="report-heading"> Reports</div>
            <div className="reports">
              <div>
                <a href="https://docs.google.com/spreadsheets/d/1yo6ixPgr9Q0xuD_qrK6IMcAiIDzU_EWqmHVy5v2UgQk/edit?gid=0#gid=0">
                  Credit Book
                </a>
              </div>
              <div>
                <a href="https://docs.google.com/spreadsheets/d/1mVv6eMKLPtctwi8iaUI4GDz_HB1HKq5rovHekaVf9OQ/edit?gid=0#gid=0">
                  Expense Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin(Accounts, "account");
