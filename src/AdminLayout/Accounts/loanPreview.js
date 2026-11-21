// Keep these rules aligned with resolveLoanSchedule/calculateLoanTerms in the API.
export const getLoanDays = (loanType, months, startDate, dueDate) => {
  if (!startDate?.isValid?.()) return null;
  if (loanType === "long-term") {
    const count = Number(months);
    return Number.isSafeInteger(count) && count > 0 ? count * 30 : null;
  }
  if (loanType !== "instant" || !dueDate?.isValid?.()) return null;
  const days = dueDate.startOf("day").diff(startDate.startOf("day"), "day");
  return days > 0 ? days : null;
};

export const getDurationDueDate = (startDate, count, unit) => {
  const multipliers = { days: 1, weeks: 7, months: 30 };
  const value = Number(count);
  if (!startDate?.isValid?.() || !Number.isSafeInteger(value) || value <= 0 || !multipliers[unit]) return null;
  const end = startDate.startOf("day").add(value * multipliers[unit], "day");
  return end.isValid() ? end : null;
};

export const getLoanPreview = (form, startDate, dueDate) => {
  const days = getLoanDays(form?.loanType, form?.duration, startDate, dueDate);
  const amount = Number(form?.loanAmount);
  const rate = Number(form?.percentage);
  if (!days || !Number.isFinite(amount) || amount <= 0 || form?.percentage == null || String(form.percentage).trim() === "" || !Number.isFinite(rate) || rate < 0) return null;
  const rawTotal = amount + (amount * days * (rate / 100)) / 30;
  // The API rounds to paise first, then floors the payable to whole rupees.
  const total = Math.floor(Math.round((rawTotal + Number.EPSILON) * 100) / 100);
  const end = startDate.startOf("day").add(days, "day");
  if (!Number.isFinite(total) || !end.isValid()) return null;
  return {
    amount,
    rate,
    days,
    dueDate: end,
    total,
    interest: Math.round((total - amount + Number.EPSILON) * 100) / 100,
    emi: form.loanType === "long-term" ? Math.round(total / Number(form.duration)) : null,
    months: form.loanType === "long-term" ? Number(form.duration) : null,
  };
};
