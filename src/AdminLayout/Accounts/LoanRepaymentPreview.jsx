import React from "react";
import LoanFundingPreview from "./LoanFundingPreview";
import { Box, Typography } from "@mui/material";

const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 2,
}).format(value);

export default function LoanRepaymentPreview({ preview }) {
  return (
    <Box role="status" aria-live="polite" sx={{ p: 1.5, borderRadius: 1.5, border: "1px solid #d6ddff", bgcolor: "#f5f7ff" }}>
      {!preview ? (
        <Typography variant="body2" color="text.secondary">Enter amount, rate and duration to preview repayment.</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 1, flexWrap: "wrap" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{preview.emi !== null ? "Monthly EMI" : "Total payable"}</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 800, color: "#5630a8" }}>{money(preview.emi ?? preview.total)}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 0.5, mt: 0.5 }}>
            <Typography variant="caption">Principal: {money(preview.amount)}</Typography>
            <Typography variant="caption">Interest: {money(preview.interest)}</Typography>
            {preview.emi !== null && <Typography variant="caption">Total: {money(preview.total)} · {preview.months} installments</Typography>}
          </Box>
          <Box component="details" sx={{ mt: 0.5, fontSize: 12, color: "text.secondary", "& summary": { cursor: "pointer" } }}>
            <summary>Calculation details</summary>
            Simple interest = amount × {preview.rate}% × {preview.days} / 30. Total payable is rounded down to whole rupees.
            {preview.emi !== null && " EMI is rounded to the nearest rupee; the final payment may differ to settle the total payable."}
          </Box>
          <LoanFundingPreview preview={preview} />
        </>
      )}
    </Box>
  );
}
