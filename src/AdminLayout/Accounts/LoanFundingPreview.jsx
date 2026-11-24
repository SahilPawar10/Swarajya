import React from "react";
import { Box, Typography } from "@mui/material";
import Axios from "../../api/axiosInterCepter";

const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 2,
}).format(value);

export default function LoanFundingPreview({ preview }) {
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState("");
  const { amount, rate, days, months } = preview;
  const date = preview.dueDate.subtract(days, "day").format("DD-MM-YYYY");
  const requestKey = JSON.stringify([amount, rate, days, months, date]);
  React.useEffect(() => {
    let active = true;
    setResult(null);
    setError("");
    const timer = setTimeout(() => {
      Axios.post("/loan/funding-preview", {
        loanAmount: amount,
        percentage: rate,
        date,
        loanType: months === null ? "instant" : "long-term",
        duration: months === null ? days : months,
      }).then(({ data }) => {
        if (active) setResult({ key: requestKey, data });
      }).catch((err) => {
        if (active) setError(err.response?.data?.message || "Unable to estimate savings interest. Please try again.");
      });
    }, 400);
    return () => { active = false; clearTimeout(timer); };
  }, [amount, rate, days, months, date, requestKey]);

  const data = result?.key === requestKey ? result.data : null;
  return (
    <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid #d6ddff" }}>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>Estimated savings interest at completion</Typography>
      {error ? <Typography variant="caption" color="error">{error}</Typography> : !data ? (
        <Typography variant="caption">Calculating funding and interest…</Typography>
      ) : (
        <>
          <Typography variant="caption" component="p">
            Group funds: {money(data.groupFundAmount)} · Personal savings used: {money(data.personalSavingsFundAmount)}
          </Typography>
          {data.personalSavingsFundAmount > 0 ? (
            <>
              <Box sx={{ mt: 1, maxHeight: 180, overflowY: "auto" }}>
                {data.contributors.map((row, index) => (
                  <Box key={`${row.user}-${index}`} sx={{ display: "flex", justifyContent: "space-between", gap: 1, py: 0.5 }}>
                    <Box>
                      <Typography variant="body2">{row.name}</Typography>
                      <Typography variant="caption">Savings used: {money(row.amount)}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, textAlign: "right" }}>{money(row.estimatedInterest)} interest</Typography>
                  </Box>
                ))}
                {!data.contributors.length && <Typography variant="caption">Your savings are not used for this loan.</Typography>}
              </Box>
              <Typography variant="caption" component="p" sx={{ mt: 1 }}>
                Savings contributors receive 70% of interest when savings fund the entire loan; for mixed funding, they receive interest in proportion to their contribution.
              </Typography>
            </>
          ) : <Typography variant="caption" component="p">No personal savings needed for this loan.</Typography>}
          <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 0.5 }}>
            Estimate assumes full repayment of the displayed total. Funding may change before approval. Any separate group share earnings are excluded.
          </Typography>
        </>
      )}
    </Box>
  );
}
