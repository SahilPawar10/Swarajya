import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomizedSnackbars from "../../MainLayout/Components/ContactUS/CustomizedSnackbars";
import { adminRoles, deleteRecord, updateRecord } from "../../api/apiService";
import "./RecordActions.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const date = { name: "date", label: "Date", type: "date" };
const amount = { name: "amount", label: "Amount", type: "number" };

export const RECORD_FIELDS = {
  credits: [date, amount, { name: "creditBy", label: "Credit By" }, { name: "desc", label: "Description" }],
  debits: [date, amount, { name: "debitBy", label: "Debit By" }, { name: "desc", label: "Description" }],
  monthly: [
    date,
    amount,
    { name: "month", label: "Month", options: MONTHS.map((value) => ({ value, label: value })) },
    { name: "year", label: "Year", type: "number" },
  ],
  installment: [
    date,
    { name: "paidAmount", label: "Amount Paid", type: "number" },
    { name: "remark", label: "Remark" },
  ],
  loan: (isLongTerm) => [
    date,
    { name: "loanAmount", label: "Loan Amount", type: "number" },
    { name: "percentage", label: "Interest %", type: "number" },
    { name: "duration", label: isLongTerm ? "Months" : "Days", type: "number" },
    { name: "reason", label: "Reason" },
  ],
  loanReason: [{ name: "reason", label: "Reason" }],
  withdraw: [amount],
  member: [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "number", label: "Mobile Number", type: "number" },
    { name: "email", label: "Email", type: "email" },
    { name: "gender", label: "Gender", optional: true },
    { name: "address", label: "Address", optional: true },
  ],
  visitor: [
    { name: "name", label: "Name" },
    { name: "number", label: "Mobile Number", type: "number" },
    { name: "email", label: "Email", type: "email" },
  ],
};

// Records store DD-MM-YYYY (older ones DD-MM-YY); the date input needs YYYY-MM-DD.
const toInputDate = (value) => {
  const [day, month, year] = String(value || "").split("-");
  if (!year) return "";
  return `${year.length === 2 ? `20${year}` : year}-${month}-${day}`;
};

const initialValues = (fields, record) =>
  Object.fromEntries(
    fields.map((field) => {
      const value = record[field.name] ?? "";
      return [field.name, field.type === "date" ? toInputDate(value) : String(value)];
    }),
  );

const getRole = () => {
  try {
    return JSON.parse(localStorage.getItem("userRole"));
  } catch {
    return null;
  }
};

function RecordActions({ title, record, fields = [], type, save, remove, lockedBy, deleteNote, onDone }) {
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const role = getRole();
  if (!adminRoles.includes(role)) return null;
  if (lockedBy) return <small className="record-locked">Edit in {lockedBy}</small>;

  const id = record.id || record._id;
  const saveRecord = save || ((data) => updateRecord(type, id, data));
  const removeRecord = remove || (() => deleteRecord(type, id));

  const run = async (action, message) => {
    setBusy(true);
    try {
      await action();
      setForm(null);
      setSnack({ open: true, message, severity: "success" });
      if (onDone) onDone();
    } catch (err) {
      setSnack({ open: true, message: err?.response?.data?.message || "Something went wrong", severity: "error" });
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const initial = initialValues(fields, record);
    const changes = fields.filter((field) => form[field.name] !== initial[field.name] && form[field.name] !== "");
    if (changes.length === 0) {
      setForm(null);
      return;
    }
    const data = Object.fromEntries(
      changes.map((field) => [field.name, field.type === "number" ? Number(form[field.name]) : form[field.name]]),
    );
    const summary = changes
      .map((field) => `${field.label}: ${initial[field.name] || "-"} → ${form[field.name]}`)
      .join("\n");
    if (!window.confirm(`Save these changes?\n\n${summary}`)) return;
    run(() => saveRecord(data), "Record updated");
  };

  const handleDelete = () => {
    if (!window.confirm(deleteNote || "Delete this record? This cannot be undone.")) return;
    run(removeRecord, "Record deleted");
  };

  return (
    <span className="record-actions">
      {fields.length > 0 && (
        <IconButton size="small" color="primary" aria-label="Edit" title="Edit" onClick={() => setForm(initialValues(fields, record))}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      )}
      {role === "admin" && (
        <IconButton size="small" color="error" aria-label="Delete" title="Delete" disabled={busy} onClick={handleDelete}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      )}

      <Dialog open={Boolean(form)} onClose={() => setForm(null)} fullWidth maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent className="record-form">
            {form &&
              fields.map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  type={field.options ? undefined : field.type || "text"}
                  select={Boolean(field.options)}
                  required={!field.optional}
                  fullWidth
                  size="small"
                  margin="dense"
                  value={form[field.name]}
                  onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                  InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
                  inputProps={field.type === "number" ? { min: 0, step: "any" } : undefined}
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setForm(null)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={busy}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <CustomizedSnackbars
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
      />
    </span>
  );
}

export default RecordActions;
