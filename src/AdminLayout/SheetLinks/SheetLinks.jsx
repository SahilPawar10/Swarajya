import React, { useEffect, useState } from "react";
import { Alert, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Pagination, TextField, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import { createSheetLink, getSheetLinks, updateSheetLink, deleteSheetLink } from "../../api/apiService";
import YearBackup from "./YearBackup";
import "./sheetLinks.css";

const emptyForm = () => ({ name: "", year: String(new Date().getFullYear()), url: "" });

function SheetLinks() {
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], years: [], totalPages: 0, totalResults: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [removing, setRemoving] = useState(false);
  let role = localStorage.getItem("userRole") || "";
  try { role = JSON.parse(role); } catch { /* Support plain role strings. */ }
  const isAdmin = role === "admin";
  const canEdit = isAdmin || role === "operator";

  const startEdit = (sheet) => {
    setEditing(sheet);
    setForm({ name: sheet.name, year: String(sheet.year), url: sheet.url });
    setFormError("");
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!deleting || removing) return;
    setRemoving(true);
    setDeleteError("");
    try {
      await deleteSheetLink(deleting.id);
      setDeleting(null);
      setSuccess("Sheet link deleted successfully.");
      setRevision((value) => value + 1);
    } catch (err) {
      setDeleteError(err.response?.data?.message || "Could not delete this sheet. Please try again.");
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getSheetLinks({ page, ...(year ? { year } : {}) })
      .then((response) => {
        if (!active) return;
        if (year && !response.data.years.includes(Number(year))) {
          setYear("");
          setPage(1);
        } else if (page > 1 && response.data.results.length === 0) {
          setPage(Math.max(1, response.data.totalPages));
        }
        setData(response.data);
      })
      .catch((err) => { if (active) setError(err.response?.data?.message || "Could not load sheets. Please try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, year, revision]);

  const handleSave = async (event) => {
    event.preventDefault();
    if (saving) return;
    setFormError("");
    setSaving(true);
    try {
      if (editing) {
        const payload = isAdmin
          ? { name: form.name.trim(), year: Number(form.year), url: form.url.trim() }
          : { name: form.name.trim() };
        await updateSheetLink(editing.id, payload);
      } else {
        await createSheetLink({ name: form.name.trim(), year: Number(form.year), url: form.url.trim() });
      }
      setOpen(false);
      setForm(emptyForm());
      if (!editing) {
        setYear("");
        setPage(1);
      }
      setSuccess(editing ? "Sheet link updated successfully." : "Sheet link added successfully.");
      setEditing(null);
      setRevision((value) => value + 1);
    } catch (err) {
      setFormError(err.response?.data?.message || "Could not save this sheet. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="sheet-links-page">
      <header className="sheet-links-header">
        <div><h1>Important Sheets</h1><p>Your important Google Sheets, organized by year.</p></div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditing(null); setForm(emptyForm()); setFormError(""); setOpen(true); }}>Add Sheet</Button>
      </header>
      {isAdmin && <YearBackup />}
      {success && <Alert severity="success" onClose={() => setSuccess("")}>{success}</Alert>}
      <div className="sheet-links-toolbar">
        <TextField select label="Year" value={year} onChange={(event) => { setYear(event.target.value); setPage(1); }} size="small" sx={{ minWidth: 160 }}>
          <MenuItem value="">All years</MenuItem>
          {data.years.map((value) => <MenuItem key={value} value={String(value)}>{value}</MenuItem>)}
        </TextField>
        {!loading && !error && <span>{data.totalResults} saved {data.totalResults === 1 ? "sheet" : "sheets"}</span>}
      </div>
      {loading ? <div className="sheet-links-state" role="status"><CircularProgress size={30} /><p>Loading sheets...</p></div> : error ? (
        <Alert severity="error" action={<Button color="inherit" onClick={() => setRevision((value) => value + 1)}>Retry</Button>}>{error}</Alert>
      ) : data.results.length === 0 ? (
        <div className="sheet-links-state"><DescriptionOutlinedIcon sx={{ fontSize: 48, color: "#16845a" }} /><h2>{year ? `No sheets for ${year}` : "Keep your important sheets together"}</h2><p>{year ? "Choose another year or add a sheet for this year." : "Use Add Sheet to save your first Google Sheets link."}</p></div>
      ) : (
        <>
          <div className="sheet-links-grid">
            {data.results.map((sheet) => (
              <article className="sheet-link-card" key={sheet.id}>
                <div className="sheet-link-card-top"><div className="sheet-link-source"><span className="sheet-link-icon"><DescriptionOutlinedIcon /></span><span>Google Sheets</span></div><Chip label={sheet.year} size="small" /></div>
                <Tooltip title={sheet.name} placement="top"><h2>{sheet.name}</h2></Tooltip>
                <div className="sheet-link-actions">
                  <Button component="a" href={sheet.url} target="_blank" rel="noopener noreferrer" variant="outlined" aria-label={`Open ${sheet.name} in Google Sheets`}>Open Sheet</Button>
                  {canEdit && <Tooltip title={isAdmin ? "Edit sheet" : "Edit name"}><IconButton className="sheet-link-edit" size="small" onClick={() => startEdit(sheet)} aria-label={`Edit ${sheet.name}`}><EditOutlinedIcon /></IconButton></Tooltip>}
                  {isAdmin && <Tooltip title="Delete link"><IconButton className="sheet-link-delete" size="small" onClick={() => { setDeleting(sheet); setDeleteError(""); }} aria-label={`Delete ${sheet.name}`}><DeleteOutlineIcon /></IconButton></Tooltip>}
                </div>
              </article>
            ))}
          </div>
          {data.totalPages > 1 && <nav className="sheet-links-pagination" aria-label="Sheets pagination"><Pagination count={data.totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" /></nav>}
        </>
      )}
      <Dialog open={open} onClose={() => { if (!saving) setOpen(false); }} fullWidth maxWidth="sm">
        <form onSubmit={handleSave}>
          <DialogTitle>{editing ? "Edit Google Sheet" : "Add Google Sheet"}</DialogTitle>
          <DialogContent className="sheet-links-form">
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField autoFocus required fullWidth label="Name / What is it about?" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} inputProps={{ maxLength: 200 }} disabled={saving} />
            <TextField required fullWidth label="Year" type="number" value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} inputProps={{ min: 1900, max: 9999, step: 1 }} disabled={saving || (Boolean(editing) && !isAdmin)} />
            <TextField required fullWidth label="Google Sheets link" type="url" placeholder="https://docs.google.com/spreadsheets/d/..." value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} inputProps={{ maxLength: 2048 }} helperText="Paste the Google Sheets sharing link. Access follows the sheet's Google sharing settings." disabled={saving || (Boolean(editing) && !isAdmin)} />
          </DialogContent>
          <DialogActions><Button onClick={() => setOpen(false)} disabled={saving}>Cancel</Button><Button type="submit" variant="contained" disabled={saving}>{saving ? "Saving..." : "Save Sheet"}</Button></DialogActions>
        </form>
      </Dialog>
      <Dialog open={Boolean(deleting)} onClose={() => { if (!removing) setDeleting(null); }} fullWidth maxWidth="xs">
        <DialogTitle>Delete sheet link?</DialogTitle>
        <DialogContent>
          {deleteError && <Alert severity="error">{deleteError}</Alert>}
          <p>Remove <strong>{deleting?.name}</strong> from Important Sheets? This removes the saved link. The Google Sheet itself stays in Google Drive.</p>
        </DialogContent>
        <DialogActions>
          <Button disabled={removing} onClick={() => setDeleting(null)}>Cancel</Button>
          <Button color="error" variant="contained" disabled={removing} onClick={handleDelete}>{removing ? "Deleting..." : "Delete"}</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default LayoutAdmin(SheetLinks, "sheet-links");
