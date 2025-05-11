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
    </div>
  );
}

export default LayoutAdmin(Accounts, "account");
