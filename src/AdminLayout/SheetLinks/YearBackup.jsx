import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Axios from '../../api/axiosInterCepter';

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const errorMessage = async (err) => {
  if (err.response?.data instanceof Blob) {
    try {
      return JSON.parse(await err.response.data.text()).message;
    } catch {
      return 'Could not export this backup. Please try again.';
    }
  }
  return err.response?.data?.message || 'Could not complete the backup operation. Please try again.';
};

export default function YearBackup() {
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const validYear = /^\d{4}$/.test(year) && Number(year) >= 1900 && Number(year) <= 9999;

  const exportBackup = async () => {
    if (busy || !validYear) return;
    setBusy('export');
    setError('');
    setSuccess('');
    try {
      const response = await Axios.get(`/backups/${year}/export`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Swarajya-Backup-${year}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSuccess(
        `Backup for ${year} downloaded. Upload it to Google Drive and open with Google Sheets, then save its link using Add Sheet.`
      );
    } catch (err) {
      setError(await errorMessage(err));
    } finally {
      setBusy('');
    }
  };

  const previewFile = async (event) => {
    const selected = event.target.files?.[0];
    event.target.value = '';
    if (!selected || busy) return;
    setError('');
    setSuccess('');
    setPreview(null);
    setFile(null);
    if (!/\.xlsx$/i.test(selected.name) || selected.size > MAX_FILE_SIZE) {
      setError('Choose an .xlsx year backup smaller than 20 MB.');
      return;
    }
    setBusy('preview');
    try {
      const body = new FormData();
      body.append('file', selected);
      const response = await Axios.post('/backups/preview', body);
      setFile(selected);
      setPreview(response.data);
    } catch (err) {
      setError(await errorMessage(err));
    } finally {
      setBusy('');
    }
  };

  const restore = async () => {
    if (busy || !file || !preview?.canRestore || !preview.previewToken) return;
    setBusy('restore');
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('previewToken', preview.previewToken);
      const response = await Axios.post('/backups/restore', body);
      setSuccess(
        `${response.data.year} backup restored: ${response.data.restored} missing records added. Existing records were preserved.`
      );
      setPreview(null);
      setFile(null);
    } catch (err) {
      setError(await errorMessage(err));
      setPreview((value) => (value ? { ...value, canRestore: false, previewToken: null } : null));
    } finally {
      setBusy('');
    }
  };
  const close = () => {
    if (!busy) {
      setPreview(null);
      setFile(null);
    }
  };
  const totals = Object.values(preview?.summary || {}).reduce(
    (total, row) => ({
      restore: total.restore + row.restore,
      skip: total.skip + row.skip,
      conflicts: total.conflicts + row.conflicts,
    }),
    { restore: 0, skip: 0, conflicts: 0 }
  );

  return (
    <Box
      component="section"
      aria-label="Yearly backup"
      sx={{ p: 2, my: 2, background: 'white', border: '1px solid #dde4ee', borderRadius: 2 }}
    >
      <Typography component="h2" variant="h6">
        Yearly backup
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
        Manually save the selected year’s activity, including monthly payments, loans, repayments, credits, debits and
        savings. Linked records from other years are included as references.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
        <TextField
          label="Backup year"
          type="number"
          size="small"
          value={year}
          disabled={Boolean(busy)}
          onChange={(event) => setYear(event.target.value)}
          inputProps={{ min: 1900, max: 9999, step: 1 }}
          sx={{ width: 150 }}
          error={!validYear}
        />
        <Button variant="contained" disabled={Boolean(busy) || !validYear} onClick={exportBackup}>
          {busy === 'export' ? 'Exporting…' : 'Export Backup'}
        </Button>
        <Button component="label" variant="outlined" disabled={Boolean(busy)}>
          {busy === 'preview' ? 'Validating…' : 'Import Backup'}
          <input type="file" accept=".xlsx" hidden disabled={Boolean(busy)} onChange={previewFile} />
        </Button>
        {busy && <CircularProgress size={22} aria-label="Processing backup" />}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
        Save the downloaded Excel workbook in Google Sheets. To restore, use File → Download → Microsoft Excel (.xlsx), then
        Import Backup. Sheets show names and financial details. Keep the full workbook, including hidden backup tabs, unchanged. Passwords are
        excluded.
      </Typography>
      {error && (
        <Alert sx={{ mt: 2 }} severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert sx={{ mt: 2 }} severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      <Dialog open={Boolean(preview)} onClose={close} fullWidth maxWidth="md">
        <DialogTitle>Review {preview?.year} backup</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error} Close this preview and select the file again to revalidate.
            </Alert>
          )}
          <Typography variant="body2" sx={{ mb: 2 }}>
            {file?.name}: {totals.restore} missing records to restore, {totals.skip} existing records to skip,{' '}
            {totals.conflicts} conflicts.
          </Typography>
          <Alert severity={preview?.canRestore ? 'info' : 'warning'}>
            Existing records will be preserved. Missing reference records will also be restored. Restored member accounts
            receive no known password; use the existing password reset flow to enable login.
          </Alert>
          <Box sx={{ overflowX: 'auto', my: 2 }}>
            <Table size="small" aria-label="Backup import summary">
              <TableHead>
                <TableRow>
                  <TableCell>Records</TableCell>
                  <TableCell align="right">Restore</TableCell>
                  <TableCell align="right">Skip</TableCell>
                  <TableCell align="right">Conflicts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(preview?.summary || {}).map(([name, row]) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">{row.restore}</TableCell>
                    <TableCell align="right">{row.skip}</TableCell>
                    <TableCell align="right">{row.conflicts}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          {preview?.conflicts?.slice(0, 100).map((conflict) => (
            <Alert severity="error" key={`${conflict.sheet}:${conflict.id}`} sx={{ mb: 1 }}>
              {conflict.sheet} / {conflict.id}: {conflict.message}
            </Alert>
          ))}
          {totals.conflicts > 100 && (
            <Typography>
              {totals.conflicts - 100} additional conflicts. Resolve the conflicts before importing again.
            </Typography>
          )}
          {totals.restore === 0 && totals.conflicts === 0 && (
            <Typography>All records already exist. Nothing needs restoring.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close} disabled={Boolean(busy)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={restore} disabled={Boolean(busy) || !preview?.canRestore || !totals.restore}>
            {busy === 'restore' ? 'Restoring…' : 'Restore Missing Records'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
