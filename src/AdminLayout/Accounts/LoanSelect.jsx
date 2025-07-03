import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getLoanByMember } from "../../api/apiService";

const ITEM_HEIGHT = 48;
const MENU_HEIGHT = 6 * ITEM_HEIGHT;

const MonthData = [
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
];

export const LoanSelect = ({ selectedLoan, handleLoanChange, member }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(member, selectedLoan, "member");
    // axios.get("/api/loans").then((res) => setLoans(res.data));
    getLoanByMember({ member })
      .then((res) => {
        const loans = res.data;
        setLoans(loans);
        setLoading(false);

        // // ✅ Auto-select the first loan if available
        // if (loans.length > 0) {
        //   handleLoanChange({ target: { value: loans[0].id } });
        // } else {
        //   handleLoanChange({ target: { value: "" } }); // clear if no loans
        // }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
  }, [member]);

  return (
    <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
      <InputLabel id="loan-select-label">Select Loan</InputLabel>
      <Select
        labelId="installment-select-label"
        id="installment-select"
        name="loanId"
        value={selectedLoan}
        label="Select Loan"
        onChange={handleLoanChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: MENU_HEIGHT,
              overflowY: "auto",
            },
          },
        }}
      >
        {loans.map((loan) => (
          <MenuItem key={loan.id} value={loan.id}>
            {loan.date} - ₹{loan.loanAmount}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const MonthSelect = ({ selecteMonth, handleMonthChange }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(selecteMonth, "member");
  }, []);

  return (
    <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
      <InputLabel id="loan-select-label">Select Month</InputLabel>
      <Select
        labelId="month-select-label"
        id="month-select"
        name="month"
        value={selecteMonth}
        label="Select Month"
        onChange={handleMonthChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: MENU_HEIGHT,
              overflowY: "auto",
            },
          },
        }}
      >
        {MonthData.map((month, i) => (
          <MenuItem key={i + month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// export default LoanSelect;
