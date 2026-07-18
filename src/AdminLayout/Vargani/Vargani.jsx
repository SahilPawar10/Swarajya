import React, { useState, useEffect, useCallback } from "react";
import "./vargani.css";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import {
  getVarganiEntries,
  getVarganiNames,
  getVarganiHistory,
  createVarganiEntry,
  deleteVarganiEntry,
  importVarganiFile,
  downloadVarganiSample,
  downloadVarganiData,
} from "../../api/apiService";
import InputFileUpload from "../Accounts/InputFileUpload";
import CustomizedSnackbars from "../../MainLayout/Components/ContactUS/CustomizedSnackbars";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const FESTIVAL_LABELS = {
  ganesh_utsav: "Ganesh Utsav",
  shivjayanti: "Shivjayanti",
};

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i);

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

function Vargani() {
  const [tab, setTab] = useState(0);

  // ── Entries tab state ──────────────────────────────────────────────────────
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterType, setFilterType] = useState("");

  // ── Add modal state ────────────────────────────────────────────────────────
  const [openModal, setOpenModal] = useState(false);
  const [names, setNames] = useState([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: dayjs(),
    year: CURRENT_YEAR,
    varganiType: "ganesh_utsav",
    remark: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // ── History tab state ──────────────────────────────────────────────────────
  const [historyName, setHistoryName] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // ── Snackbar ───────────────────────────────────────────────────────────────
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnack = (message, severity = "success") =>
    setSnack({ open: true, message, severity });

  // ── Fetch entries ──────────────────────────────────────────────────────────
  const fetchEntries = useCallback(() => {
    setLoadingEntries(true);
    const params = {};
    if (filterYear) params.year = filterYear;
    if (filterType) params.varganiType = filterType;
    getVarganiEntries(params)
      .then((res) => setEntries(res.data || []))
      .catch(() => showSnack("Failed to load entries", "error"))
      .finally(() => setLoadingEntries(false));
  }, [filterYear, filterType]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // ── Fetch names for dropdown ───────────────────────────────────────────────
  useEffect(() => {
    getVarganiNames()
      .then((res) => setNames(res.data || []))
      .catch(() => {});
  }, []);

  // ── Add entry ──────────────────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.amount || !form.date) {
      showSnack("Name, amount and date are required", "error");
      return;
    }
    setSubmitting(true);
    const payload = {
      name: form.name,
      amount: Number(form.amount),
      date: form.date ? dayjs(form.date).format("DD-MM-YYYY") : "",
      year: Number(form.year),
      varganiType: form.varganiType,
      remark: form.remark,
    };
    createVarganiEntry(payload)
      .then(() => {
        showSnack("Entry added successfully!");
        setOpenModal(false);
        setForm({
          name: "",
          amount: "",
          date: dayjs(),
          year: CURRENT_YEAR,
          varganiType: "ganesh_utsav",
          remark: "",
        });
        fetchEntries();
        getVarganiNames().then((res) => setNames(res.data || []));
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message || "Failed to add entry";
        showSnack(msg, "error");
      })
      .finally(() => setSubmitting(false));
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (!window.confirm("Delete this entry?")) return;
    deleteVarganiEntry(id)
      .then(() => {
        showSnack("Entry deleted");
        fetchEntries();
      })
      .catch(() => showSnack("Failed to delete", "error"));
  };

  // ── Import ─────────────────────────────────────────────────────────────────
  const handleImport = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    importVarganiFile(formData)
      .then((res) => {
        showSnack(`Imported ${res.data?.inserted || 0} records successfully!`);
        fetchEntries();
        getVarganiNames().then((r) => setNames(r.data || []));
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || "Import failed";
        showSnack(msg, "error");
      });
  };

  // ── Export ─────────────────────────────────────────────────────────────────
  const handleExportSample = () => {
    downloadVarganiSample()
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "vargani_sample.xlsx";
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
      })
      .catch(() => showSnack("Download failed", "error"));
  };

  const handleExportData = () => {
    const params = {};
    if (filterYear) params.year = filterYear;
    if (filterType) params.varganiType = filterType;
    downloadVarganiData(params)
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "vargani_data.xlsx";
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
      })
      .catch(() => showSnack("Export failed", "error"));
  };

  // ── History ────────────────────────────────────────────────────────────────
  const handleFetchHistory = () => {
    if (!historyName) {
      showSnack("Please select a name", "warning");
      return;
    }
    setLoadingHistory(true);
    getVarganiHistory(historyName)
      .then((res) => setHistoryData(res.data))
      .catch(() => showSnack("Failed to load history", "error"))
      .finally(() => setLoadingHistory(false));
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="vargani-page">
      {/* Page Header */}
      <div className="vargani-header">
        <div className="vargani-title">
          <EmojiEventsIcon sx={{ fontSize: "2rem", color: "#fd7e14" }} />
          <div>
            <h2>Vargani</h2>
            <p>Festival contribution records — Ganesh Utsav &amp; Shivjayanti</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ borderBottom: "1px solid #e0e0e0", mb: 2 }}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#fd7e14" } }}
      >
        <Tab label="Entries" />
        <Tab label="Member History" />
      </Tabs>

      {/* ── ENTRIES TAB ─────────────────────────────────────────────────── */}
      {tab === 0 && (
        <div className="vargani-entries">
          {/* Filters + Actions */}
          <div className="vargani-toolbar">
            <div className="vargani-filters">
              <FormControl size="small" sx={{ minWidth: 110 }}>
                <InputLabel>Year</InputLabel>
                <Select
                  value={filterYear}
                  label="Year"
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {YEAR_OPTIONS.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Festival</InputLabel>
                <Select
                  value={filterType}
                  label="Festival"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="ganesh_utsav">Ganesh Utsav</MenuItem>
                  <MenuItem value="shivjayanti">Shivjayanti</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="vargani-actions">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenModal(true)}
                sx={{ background: "#fd7e14", "&:hover": { background: "#e06900" } }}
              >
                Add Entry
              </Button>
              <InputFileUpload onFilesSelected={handleImport} label="Import" />
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportData}
                sx={{ borderColor: "#fd7e14", color: "#fd7e14" }}
              >
                Export
              </Button>
              <Button
                variant="text"
                onClick={handleExportSample}
                sx={{ color: "#667085" }}
              >
                Sample
              </Button>
            </div>
          </div>

          {/* Summary badges */}
          {!loadingEntries && entries.length > 0 && (
            <div className="vargani-summary-bar">
              <span className="vg-badge">
                Total entries: <strong>{entries.length}</strong>
              </span>
              <span className="vg-badge">
                Total amount:{" "}
                <strong>
                  ₹{entries.reduce((s, e) => s + Number(e.amount || 0), 0).toLocaleString()}
                </strong>
              </span>
            </div>
          )}

          {/* Table */}
          <div className="vargani-table-wrap">
            {loadingEntries ? (
              <div className="vg-center">
                <CircularProgress sx={{ color: "#fd7e14" }} />
              </div>
            ) : entries.length === 0 ? (
              <div className="vg-center vg-empty">No entries found</div>
            ) : (
              <table className="vg-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Year</th>
                    <th>Festival</th>
                    <th>Remark</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => (
                    <tr key={entry.id || entry._id}>
                      <td>{i + 1}</td>
                      <td className="vg-bold">{entry.name}</td>
                      <td>
                        <span className="vg-amount">₹{Number(entry.amount).toLocaleString()}</span>
                      </td>
                      <td>{entry.date}</td>
                      <td>{entry.year}</td>
                      <td>
                        <span
                          className={`vg-chip ${
                            entry.varganiType === "ganesh_utsav"
                              ? "vg-chip-orange"
                              : "vg-chip-blue"
                          }`}
                        >
                          {FESTIVAL_LABELS[entry.varganiType] || entry.varganiType}
                        </span>
                      </td>
                      <td className="vg-muted">{entry.remark || "—"}</td>
                      <td>
                        <DeleteOutlineIcon
                          className="vg-delete-btn"
                          onClick={() => handleDelete(entry.id || entry._id)}
                          sx={{ fontSize: "1.1rem", cursor: "pointer", color: "#e53935" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ── HISTORY TAB ─────────────────────────────────────────────────── */}
      {tab === 1 && (
        <div className="vargani-history">
          <div className="vg-history-search">
            <Autocomplete
              options={names}
              value={historyName}
              onChange={(_, v) => {
                setHistoryName(v);
                setHistoryData(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select member name" size="small" sx={{ width: 280 }} />
              )}
              freeSolo
              onInputChange={(_, v) => {
                if (!v) { setHistoryName(null); setHistoryData(null); }
              }}
            />
            <Button
              variant="contained"
              startIcon={<PersonSearchIcon />}
              onClick={handleFetchHistory}
              disabled={loadingHistory || !historyName}
              sx={{ background: "#fd7e14", "&:hover": { background: "#e06900" } }}
            >
              View History
            </Button>
          </div>

          {loadingHistory && (
            <div className="vg-center" style={{ marginTop: 40 }}>
              <CircularProgress sx={{ color: "#fd7e14" }} />
            </div>
          )}

          {historyData && !loadingHistory && (
            <div className="vg-history-result">
              {/* Member summary cards */}
              <div className="vg-hist-cards">
                <div className="vg-hist-card">
                  <p>Total Contributed</p>
                  <strong>₹{Number(historyData.totalContributed).toLocaleString()}</strong>
                </div>
                <div className="vg-hist-card">
                  <p>Years Participated</p>
                  <strong>{historyData.yearsParticipated}</strong>
                </div>
              </div>

              {/* Year-wise breakdown */}
              {historyData.history.map((yr) => (
                <div key={yr.year} className="vg-year-block">
                  <div className="vg-year-header">
                    <span className="vg-year-label">{yr.year}</span>
                    <span className="vg-year-total">
                      ₹{Number(yr.totalAmount).toLocaleString()}
                    </span>
                  </div>
                  <table className="vg-table">
                    <thead>
                      <tr>
                        <th>Festival</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yr.entries.map((e) => (
                        <tr key={e.id || e._id}>
                          <td>
                            <span
                              className={`vg-chip ${
                                e.varganiType === "ganesh_utsav"
                                  ? "vg-chip-orange"
                                  : "vg-chip-blue"
                              }`}
                            >
                              {FESTIVAL_LABELS[e.varganiType] || e.varganiType}
                            </span>
                          </td>
                          <td>
                            <span className="vg-amount">₹{Number(e.amount).toLocaleString()}</span>
                          </td>
                          <td>{e.date}</td>
                          <td className="vg-muted">{e.remark || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ADD ENTRY MODAL ──────────────────────────────────────────────── */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Add Vargani Entry
          </Typography>

          <Autocomplete
            options={names}
            value={form.name}
            onChange={(_, v) => setForm((p) => ({ ...p, name: v || "" }))}
            onInputChange={(_, v) => setForm((p) => ({ ...p, name: v }))}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Name"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          <TextField
            label="Amount (₹)"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleFormChange}
            size="small"
            fullWidth
            sx={{ mb: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={form.date}
              onChange={(v) => setForm((p) => ({ ...p, date: v }))}
              format="DD-MM-YYYY"
              slotProps={{ textField: { size: "small", fullWidth: true, sx: { mb: 2 } } }}
            />
          </LocalizationProvider>

          <FormControl size="small" fullWidth sx={{ mb: 2 }}>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={form.year}
              label="Year"
              onChange={handleFormChange}
            >
              {YEAR_OPTIONS.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth sx={{ mb: 2 }}>
            <InputLabel>Festival</InputLabel>
            <Select
              name="varganiType"
              value={form.varganiType}
              label="Festival"
              onChange={handleFormChange}
            >
              <MenuItem value="ganesh_utsav">Ganesh Utsav</MenuItem>
              <MenuItem value="shivjayanti">Shivjayanti</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Remark (optional)"
            name="remark"
            value={form.remark}
            onChange={handleFormChange}
            size="small"
            fullWidth
            sx={{ mb: 3 }}
          />

          <div className="vg-modal-actions">
            <Button
              onClick={() => setOpenModal(false)}
              variant="outlined"
              sx={{ borderColor: "#ccc", color: "#555" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={submitting}
              sx={{ background: "#fd7e14", "&:hover": { background: "#e06900" } }}
            >
              {submitting ? "Saving…" : "Save"}
            </Button>
          </div>
        </Box>
      </Modal>

      <CustomizedSnackbars
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack((p) => ({ ...p, open: false }))}
      />
    </div>
  );
}

export default LayoutAdmin(Vargani, "vargani");
