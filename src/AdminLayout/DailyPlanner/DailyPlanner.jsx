import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Axios from '../../api/axiosInterCepter';
import './dailyPlanner.css';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
const labels = { pending: 'Awaiting review', done: 'Done', partial: 'Partially done', not_done: 'Not done' };
const messageOf = (error) => error.response?.data?.message || 'Unable to connect. Please try again.';
const emptyForm = { title: '', note: '', target: 1, priority: 'normal' };

export default function DailyPlanner() {
  const [mode, setMode] = useState('today');
  const [clock, setClock] = useState(() => dayjs().format('YYYY-MM-DD'));
  const tomorrow = dayjs(clock).add(1, 'day').format('YYYY-MM-DD');
  const [historyDate, setHistoryDate] = useState(clock);
  const date = mode === 'tomorrow' ? tomorrow : mode === 'history' ? historyDate : clock;
  const [data, setData] = useState({ tasks: [], backlog: [] });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [review, setReview] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const sequence = useRef(0);
  const load = useCallback(async () => {
    const request = ++sequence.current;
    setLoading(true);
    setError('');
    try {
      const result = await Axios.get('/daily-planner', { params: { date, timezone } });
      if (request === sequence.current) setData(result.data);
    } catch (err) {
      if (request === sequence.current) setError(messageOf(err));
    } finally {
      if (request === sequence.current) setLoading(false);
    }
  }, [date]);
  useEffect(() => {
    load();
    return () => {
      sequence.current += 1;
    };
  }, [load]);
  useEffect(() => {
    const timer = setInterval(() => setClock(dayjs().format('YYYY-MM-DD')), 30000);
    return () => clearInterval(timer);
  }, []);

  const mutate = async (action, success) => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await action();
      setNotice(success);
      await load();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(false);
    }
  };
  const prepare = () =>
    mutate(async () => {
      const result = await Axios.post('/daily-planner/carry-forward', { date: tomorrow, timezone });
      setMode('tomorrow');
      return result;
    }, 'Tomorrow is ready. Reviewed unfinished tasks have been carried forward.');
  const openReview = (task) => {
    const entry = task.reviews[task.reviews.length - 1];
    setReview({
      task,
      status: entry.status === 'pending' ? 'done' : entry.status,
      completed: entry.completed,
      remark: entry.remark,
    });
  };
  const saveReview = (event) => {
    event.preventDefault();
    mutate(async () => {
      await Axios.patch(`/daily-planner/${review.task.id}/review`, {
        status: review.status,
        remark: review.remark,
        completed: Number(review.completed),
        version: review.task.version,
        timezone,
      });
      setReview(null);
    }, 'Review saved. Unfinished work is ready for your next plan.');
  };
  const addTask = (event) => {
    event.preventDefault();
    mutate(async () => {
      await Axios.post('/daily-planner', { ...form, target: Number(form.target), date, timezone });
      setAdding(false);
      setForm(emptyForm);
    }, 'Task added to your plan.');
  };
  const tasks = data.tasks.filter((task) => task.reviews.some((entry) => entry.date === date));
  const done = tasks.filter((task) => task.reviews.find((entry) => entry.date === date)?.status === 'done').length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const backlog = mode === 'today' ? data.backlog : [];
  const unreviewed = data.backlog.filter((task) => task.status === 'pending').length;
  const renderTask = (task, overdue = false) => {
    const entry = overdue ? task.reviews[task.reviews.length - 1] : task.reviews.find((item) => item.date === date);
    if (!entry) return null;
    const active = task.activeDate === entry.date;
    const canReview = mode === 'today' && active && task.activeDate <= clock;
    const index = task.reviews.findIndex((item) => item.date === entry.date);
    const previous = index > 0 ? task.reviews[index - 1] : null;
    return (
      <article className={`dp-task dp-task-${entry.status}`} key={task.id}>
        <button
          type="button"
          className="dp-check"
          disabled={!canReview || busy}
          aria-label={`Review ${task.title}`}
          onClick={() => openReview(task)}
        >
          {entry.status === 'done' ? (
            <CheckRoundedIcon />
          ) : entry.status === 'partial' ? (
            <span>−</span>
          ) : (
            <span className="dp-check-dot" />
          )}
        </button>
        <div className="dp-task-body">
          <div className="dp-task-tags">
            <span className={`dp-status dp-status-${entry.status}`}>{labels[entry.status]}</span>
            {task.priority === 'high' && <span className="dp-priority">Priority</span>}
            {index > 0 && <span className="dp-carry">Carried forward · {index}×</span>}
            {overdue && <span>Planned {dayjs(entry.date).format('D MMM')}</span>}
          </div>
          <h4 title={task.title}>{task.title}</h4>
          {entry.target > 1 && (
            <div className="dp-quantity">
              <span>
                {entry.completed} / {entry.target} completed
              </span>
              <LinearProgress variant="determinate" value={(entry.completed / entry.target) * 100} />
            </div>
          )}
          {(task.note || entry.remark || previous?.remark || index > 0) && (
            <details className="dp-details">
              <summary aria-label={`Details for ${task.title}`}>Details</summary>
              <div className="dp-details-content">
                {task.note && <p className="dp-note"><strong>Notes</strong><br />{task.note}</p>}
                {entry.remark && <p className="dp-remark"><strong>Remark</strong> {entry.remark}</p>}
                {previous?.remark && <p className="dp-previous">Previous review · {previous.remark}</p>}
                {index > 0 && <small>Originally planned {dayjs(task.originalDate).format('D MMM YYYY')}</small>}
              </div>
            </details>
          )}
        </div>
        <div className="dp-task-actions">
          {canReview && (
            <Tooltip title={entry.status === 'pending' ? 'Review task' : 'Edit review or undo'}>
              <span>
              <IconButton disabled={busy} aria-label={`Edit review for ${task.title}`} onClick={() => openReview(task)}>
                <EditNoteRoundedIcon />
              </IconButton>
              </span>
            </Tooltip>
          )}
          {mode !== 'history' && active && task.reviews.length === 1 && entry.status === 'pending' && (
            <Tooltip title="Remove task">
              <span>
              <IconButton disabled={busy} aria-label={`Remove ${task.title}`} onClick={() => setDeleting(task)}>
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
              </span>
            </Tooltip>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="daily-planner" aria-label="My daily planner">
      <header className="dp-hero">
        <div>
          <h2>Daily planner</h2>
          <span className="dp-private">
            <LockOutlinedIcon sx={{ fontSize: 13 }} /> Only you can see your planner
          </span>
        </div>
        <div className="dp-hero-date">
          <span>{dayjs(clock).format('ddd, D MMM YYYY')}</span>
        </div>
      </header>
      <div className="dp-navigation">
        <div className="dp-segments" role="group" aria-label="Planner views">
          {[
            { id: 'today', text: '01  Review today' },
            { id: 'tomorrow', text: '02  Plan tomorrow' },
            { id: 'history', text: 'History' },
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              aria-pressed={mode === tab.id}
              className={mode === tab.id ? 'selected' : ''}
              disabled={busy}
              onClick={() => {
                setNotice('');
                if (tab.id === 'tomorrow') prepare();
                else setMode(tab.id);
              }}
            >
              {tab.text}
            </button>
          ))}
        </div>
        <Tooltip title="Refresh planner">
          <span>
          <IconButton aria-label="Refresh planner" onClick={load} disabled={busy || loading}>
            <RefreshRoundedIcon />
          </IconButton>
          </span>
        </Tooltip>
      </div>
      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={load}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      {notice && (
        <Alert severity="success" onClose={() => setNotice('')}>
          {notice}
        </Alert>
      )}
      <div className="dp-workspace">
        <aside className="dp-aside">
          <div className="dp-summary">
            <span className="dp-eyebrow">{mode === 'tomorrow' ? 'The plan ahead' : 'Small steps count'}</span>
            <h3>
              {done}
              <span> / {tasks.length}</span>
            </h3>
            <p>tasks completed {mode === 'history' ? 'on this day' : 'in this plan'}</p>
            <LinearProgress variant="determinate" value={percent} />
            <div className="dp-summary-line">
              <span>Progress</span>
              <strong>{percent}%</strong>
            </div>
          </div>
          <div className="dp-ritual">
            <details>
            <summary><NightsStayOutlinedIcon fontSize="small" /> Your nightly ritual</summary>
            <div className="dp-ritual-help">
            <ol>
              <li>Review each task honestly.</li>
              <li>Leave a note for your future self.</li>
              <li>Carry the unfinished work forward.</li>
              <li>Add tomorrow’s next steps.</li>
            </ol>
            <p>
              For a quantity task, enter the daily target separately: “Apply to jobs” + target 5. Complete 3, and only 2
              carry forward.
            </p>
            </div>
            </details>
            {mode === 'today' && (
              <Button
                fullWidth
                endIcon={<ArrowForwardRoundedIcon />}
                disabled={busy || loading || !!error}
                onClick={prepare}
              >
                Prepare tomorrow
              </Button>
            )}
          </div>
        </aside>
        <div className="dp-main">
          <div className="dp-list-heading">
            <div>
              <span className="dp-eyebrow">
                {mode === 'tomorrow' ? 'A fresh start' : mode === 'history' ? 'Your daily diary' : 'Close the loop'}
              </span>
              <h3>
                {mode === 'tomorrow'
                  ? 'Tomorrow’s plan'
                  : mode === 'history'
                  ? 'Past plans & reflections'
                  : 'Today’s review'}
              </h3>
              <p>{dayjs(date).format('dddd, D MMMM YYYY')}</p>
            </div>
            {mode !== 'history' && (
              <Button
                variant="contained"
                disableElevation
                startIcon={<AddRoundedIcon />}
                disabled={busy || loading || !!error}
                onClick={() => setAdding(true)}
              >
                Add task
              </Button>
            )}
          </div>
          {mode === 'history' && (
            <TextField
              label="Choose a day"
              type="date"
              size="small"
              value={historyDate}
              onChange={(event) => {
                if (event.target.value) setHistoryDate(event.target.value);
              }}
              inputProps={{ max: clock, min: '2000-01-01' }}
              InputLabelProps={{ shrink: true }}
            />
          )}
          {loading ? (
            <div className="dp-empty" role="status">
              <CircularProgress size={28} />
              <p>Opening your planner…</p>
            </div>
          ) : (
            !error && (
              <>
                {mode === 'tomorrow' && unreviewed > 0 && (
                  <Alert severity="info">
                    {unreviewed} earlier task{unreviewed === 1 ? ' needs' : 's need'} a review before carrying forward.{' '}
                    <Button size="small" onClick={() => setMode('today')}>
                      Review today
                    </Button>
                  </Alert>
                )}
                {!!backlog.length && (
                  <div className="dp-backlog">
                    <div className="dp-section-label">
                      Earlier unfinished work <span>{backlog.length}</span>
                    </div>
                    <div className="dp-task-grid">{backlog.map((task) => renderTask(task, true))}</div>
                  </div>
                )}
                {!!tasks.length && (
                  <div className="dp-section-label">
                    {mode === 'history' ? 'Recorded tasks' : 'Your list'}
                    <span>{tasks.length}</span>
                  </div>
                )}
                <div className="dp-task-grid">{tasks.map((task) => renderTask(task))}</div>
                {!tasks.length && (
                  <div className="dp-empty">
                    <span className="dp-empty-icon">
                      <EditNoteRoundedIcon sx={{ fontSize: 36 }} />
                    </span>
                    <h4>
                      {mode === 'history'
                        ? 'No plan recorded for this day'
                        : mode === 'tomorrow'
                        ? 'What would make tomorrow a good day?'
                        : 'A little space to begin'}
                    </h4>
                    <p>
                      {mode === 'history'
                        ? 'Choose another date to revisit your progress.'
                        : 'Add one meaningful task. You can build the rest from there.'}
                    </p>
                    {mode !== 'history' && (
                      <Button startIcon={<AddRoundedIcon />} onClick={() => setAdding(true)}>
                        Write your first task
                      </Button>
                    )}
                  </div>
                )}
              </>
            )
          )}
        </div>

      </div>

      <Dialog
        open={adding}
        onClose={() => {
          if (!busy) setAdding(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={addTask}>
          <DialogTitle>{mode === 'tomorrow' ? 'A task for tomorrow' : 'Add to today’s plan'}</DialogTitle>
          <DialogContent className="dp-form">
            <TextField
              autoFocus
              required
              label="What do you want to do?"
              placeholder="e.g. Apply to jobs"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              inputProps={{ maxLength: 300 }}
            />
            <TextField
              label="Notes / definition of done"
              multiline
              minRows={2}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              inputProps={{ maxLength: 2000 }}
            />
            <div className="dp-form-row">
              <TextField
                required
                label="Target quantity"
                type="number"
                value={form.target}
                onChange={(e) => setForm({ ...form, target: e.target.value })}
                inputProps={{ min: 1, max: 100000, step: 1 }}
                helperText="Use 1 for a single learning task"
              />
              <TextField
                select
                label="Priority"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="high">High priority</MenuItem>
              </TextField>
            </div>
            {error && <Alert severity="error">{error}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button disabled={busy} onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button disabled={busy} type="submit" variant="contained">
              {busy ? 'Saving…' : 'Add to plan'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={!!review}
        onClose={() => {
          if (!busy) setReview(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        {review && (
          <form onSubmit={saveReview}>
            <DialogTitle>How did it go?</DialogTitle>
            <DialogContent className="dp-form">
              <h4>{review.task.title}</h4>
              <TextField
                select
                label="Result"
                value={review.status}
                onChange={(e) =>
                  setReview({
                    ...review,
                    status: e.target.value,
                    completed:
                      e.target.value === 'partial' && review.completed >= review.task.reviews.at(-1).target
                        ? 0
                        : review.completed,
                  })
                }
              >
                {Object.entries(labels).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {key === 'pending' ? 'Undo review / mark pending' : value}
                  </MenuItem>
                ))}
              </TextField>
              {review.status === 'partial' && review.task.reviews.at(-1).target > 1 && (
                <TextField
                  required
                  label="How many did you complete today?"
                  type="number"
                  value={review.completed}
                  onChange={(e) => setReview({ ...review, completed: e.target.value })}
                  inputProps={{ min: 0, max: review.task.reviews.at(-1).target - 1, step: 1 }}
                  helperText={`Daily target: ${review.task.reviews.at(-1).target}. Only the remainder carries forward.`}
                />
              )}
              <TextField
                label="Remark / what to pick up next"
                placeholder="e.g. Applied to 3 jobs. Two more tomorrow."
                multiline
                minRows={3}
                value={review.remark}
                onChange={(e) => setReview({ ...review, remark: e.target.value })}
                inputProps={{ maxLength: 2000 }}
              />
              {error && <Alert severity="error">{error}</Alert>}
            </DialogContent>
            <DialogActions>
              <Button disabled={busy} onClick={() => setReview(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={busy}>
                {busy ? 'Saving…' : 'Save review'}
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
      <Dialog
        open={!!deleting}
        onClose={() => {
          if (!busy) setDeleting(null);
        }}
      >
        <DialogTitle>Remove this task?</DialogTitle>
        <DialogContent>
          {deleting?.title}
          <p>This removes an unreviewed task from your plan.</p>
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button disabled={busy} onClick={() => setDeleting(null)}>
            Keep task
          </Button>
          <Button
            color="error"
            disabled={busy}
            onClick={() =>
              mutate(async () => {
                await Axios.delete(`/daily-planner/${deleting.id}`);
                setDeleting(null);
              }, 'Task removed.')
            }
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
