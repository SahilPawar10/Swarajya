import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionIcon from "@mui/icons-material/Description";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InputIcon from "@mui/icons-material/Input";
import LoginIcon from "@mui/icons-material/Login";
import SavingsIcon from "@mui/icons-material/Savings";
import axiosInstance from "../../api/axiosInterCepter";
import { formatCurrency, formatPercent } from "../../utils/common";
import RecordActions, { RECORD_FIELDS } from "./RecordActions";

const PAGE_SIZE = 10;
const OVERVIEW_URL = "/loan/dashboard/admin-overview";

const RANKING_COLUMNS = [
  { key: "name", label: "User" },
  { key: "totalCredits", label: "Credits Earned" },
  { key: "totalEarnings", label: "Earnings (after withdrawals)" },
  { key: "totalWithdrawn", label: "Withdrawn" },
  { key: "creditCount", label: "Credit Entries" },
  { key: "latestEarningDay", label: "Latest Earning" },
];

const shortId = (id = "") => id.slice(-6).toUpperCase();
const formatDay = (day) => (day ? dayjs(day).format("DD-MM-YYYY") : "-");
const getErrorMessage = (err) =>
  err?.response?.data?.message || "Unable to load dashboard data";

// Keeps the latest request only, so a slow earlier response cannot overwrite newer filters.
const useDashboardQuery = (url, params, refreshKey) => {
  const [state, setState] = useState({ data: null, error: "" });
  const key = JSON.stringify(params);

  useEffect(() => {
    if (!url) return undefined;
    let active = true;
    axiosInstance
      .get(url, { params: JSON.parse(key) })
      .then((res) => active && setState({ data: res.data, error: "" }))
      .catch((err) => active && setState({ data: null, error: getErrorMessage(err) }));
    return () => {
      active = false;
    };
  }, [url, key, refreshKey]);

  return state;
};

const dropEmpty = (params) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value));

// The API is limited to admins and operators, so regular users must not call it.
export const useLoanOverview = (enabled, refreshKey) => {
  const [range, setRange] = useState({ from: "", to: "" });
  const { data, error } = useDashboardQuery(
    enabled ? OVERVIEW_URL : null,
    dropEmpty(range),
    refreshKey,
  );
  return { range, setRange, data, error };
};

export function SummaryCard({ title, value, note, tone, icon, onClick }) {
  const Card = onClick ? "button" : "div";
  return (
    <Card
      className={`ad-summary-card${onClick ? " ad-clickable" : ""}`}
      {...(onClick ? { type: "button", onClick } : {})}
    >
      <i className={`ad-icon ad-${tone}`}>{icon}</i>
      <span className="ad-summary-text">
        <em>{title}</em>
        <strong>{value}</strong>
        <span>{note}</span>
      </span>
    </Card>
  );
}

function DateRangeFilter({ range, onChange, children }) {
  const today = dayjs().format("YYYY-MM-DD");
  return (
    <div className="ao-filters">
      <label>
        From
        <input
          type="date"
          value={range.from}
          max={range.to || undefined}
          onChange={(e) => onChange({ ...range, from: e.target.value })}
        />
      </label>
      <label>
        To
        <input
          type="date"
          value={range.to}
          min={range.from || undefined}
          onChange={(e) => onChange({ ...range, to: e.target.value })}
        />
      </label>
      <button
        type="button"
        onClick={() =>
          onChange({ from: dayjs().startOf("month").format("YYYY-MM-DD"), to: today })
        }
      >
        This Month
      </button>
      <button type="button" onClick={() => onChange({ from: "", to: "" })}>
        All Time
      </button>
      {children}
    </div>
  );
}

function Pager({ data, onPage }) {
  if (!data || data.totalPages <= 1) return null;
  return (
    <div className="ao-pager">
      <button type="button" disabled={data.page <= 1} onClick={() => onPage(data.page - 1)}>
        Previous
      </button>
      <span>
        Page {data.page} of {data.totalPages} ({data.totalResults} records)
      </span>
      <button
        type="button"
        disabled={data.page >= data.totalPages}
        onClick={() => onPage(data.page + 1)}
      >
        Next
      </button>
    </div>
  );
}

function WithdrawalTrend({ data }) {
  const maxValue = Math.max(1, ...data.map((point) => point.withdrawn));

  return (
    <div className="ad-panel">
      <div className="ad-panel-header">
        <h3>Withdrawals (last 12 months)</h3>
      </div>
      <div className="ao-chart" role="img" aria-label="Monthly withdrawals">
        {data.map((point) => (
          <div className="ao-chart-col" key={point.key} tabIndex={0}>
            <div className="ao-chart-tip">
              <strong>{point.label}</strong>
              <span>Withdrawn {formatCurrency(point.withdrawn)}</span>
            </div>
            <div className="ao-chart-bars">
              <span
                className="ao-series-withdrawn"
                style={{ height: `${(point.withdrawn / maxValue) * 100}%` }}
              />
            </div>
            <small>{point.label.split(" ")[0]}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentList({ title, rows, render }) {
  return (
    <div className="ad-panel">
      <div className="ad-panel-header">
        <h3>{title}</h3>
      </div>
      <div className="ao-recent">
        {rows.length === 0 && <p className="ao-empty">No records yet</p>}
        {rows.map((row) => (
          <div className="ao-recent-row" key={row.id}>
            {render(row)}
          </div>
        ))}
      </div>
    </div>
  );
}

function CompletedLoans({ rows }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="ad-panel">
      <div className="ad-panel-header">
        <h3>Recent Completed Loans</h3>
      </div>
      {rows.length === 0 && <p className="ao-empty">No completed loans in this period</p>}
      {rows.map((row) => {
        const open = openId === row.id;
        return (
          <div key={row.id}>
            <button
              type="button"
              className="ao-recent-row ao-loan-toggle"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : row.id)}
            >
              <span>
                <strong>{row.name}</strong>
                <small>
                  Completed {formatDay(row.completedDay)} · {formatPercent(row.percentage)}
                </small>
                <small>
                  {formatCurrency(row.totalCredits)} credits to {row.credits.length} member
                  {row.credits.length === 1 ? "" : "s"}
                </small>
              </span>
              <b>
                {formatCurrency(row.amount)} {open ? "▲" : "▼"}
              </b>
            </button>
            {open && (
              <div className="ao-loan-credits">
                {row.credits.length === 0 && (
                  <p className="ao-empty">No credits were shared on this loan</p>
                )}
                {row.credits.map((credit) => (
                  <div key={credit.userId}>
                    <span>{credit.name}</span>
                    <b>{formatCurrency(credit.amount)}</b>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EarningsRanking({ range }) {
  const [ranking, setRanking] = useState({
    search: "",
    sortBy: "totalCredits",
    order: "desc",
    page: 1,
  });
  const rankingQuery = useDashboardQuery(
    "/loan/dashboard/earnings-ranking",
    dropEmpty({ ...range, ...ranking, limit: PAGE_SIZE }),
  );

  useEffect(() => {
    setRanking((prev) => ({ ...prev, page: 1 }));
  }, [range.from, range.to]);

  const sortRanking = (key) =>
    setRanking((prev) => ({
      ...prev,
      sortBy: key,
      order: prev.sortBy === key && prev.order === "desc" ? "asc" : "desc",
      page: 1,
    }));

  return (
    <div className="ad-panel ao-section">
      <div className="ad-panel-header">
        <h3>User-wise Credits and Earnings</h3>
        <input
          className="ao-search"
          type="search"
          placeholder="Search name or ID"
          aria-label="Search user-wise credits"
          value={ranking.search}
          onChange={(e) => setRanking({ ...ranking, search: e.target.value, page: 1 })}
        />
      </div>
      {rankingQuery.error && <p className="ao-error">{rankingQuery.error}</p>}
      <div className="ao-table-wrap">
        <table className="client-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User ID</th>
              {RANKING_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  aria-sort={
                    ranking.sortBy === col.key
                      ? ranking.order === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <button type="button" className="ao-sort" onClick={() => sortRanking(col.key)}>
                    {col.label}
                    {ranking.sortBy === col.key ? (ranking.order === "asc" ? " ▲" : " ▼") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankingQuery.data?.results.map((row, index) => (
              <tr key={row.userId}>
                <td>{(rankingQuery.data.page - 1) * rankingQuery.data.limit + index + 1}</td>
                <td title={row.userId}>{shortId(row.userId)}</td>
                <td className="bold-score">{row.name}</td>
                <td>{formatCurrency(row.totalCredits)}</td>
                <td>{formatCurrency(row.totalEarnings)}</td>
                <td>{formatCurrency(row.totalWithdrawn)}</td>
                <td>{row.creditCount}</td>
                <td>{formatDay(row.latestEarningDay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pager data={rankingQuery.data} onPage={(page) => setRanking({ ...ranking, page })} />
    </div>
  );
}

export function LoanCreditKpis({ overview, onOpenTab }) {
  const navigate = useNavigate();
  const { data, error, range, setRange } = overview;
  const openMembers = () => navigate("/members");
  const cards = data
    ? [
        { title: "Principal Given", value: formatCurrency(data.totalDistributed), note: "Money lent, without interest", tone: "violet", icon: <AccountBalanceWalletIcon />, onClick: () => onOpenTab(5) },
        { title: "Interest Earned", value: formatCurrency(data.totalInterestEarned), note: "Received beyond principal", tone: "amber", icon: <SavingsIcon />, onClick: () => onOpenTab(5) },
        { title: "Total Collected", value: formatCurrency(data.totalCollected), note: "Repayments, with interest", tone: "green", icon: <InputIcon />, onClick: () => onOpenTab(4) },
        { title: "Outstanding", value: formatCurrency(data.totalOutstanding), note: "Unpaid, with interest", tone: "rose", icon: <AccountBalanceWalletIcon />, onClick: () => onOpenTab(5) },
        { title: "Loans Created", value: data.totalLoans, note: "Approved loans", tone: "blue", icon: <DescriptionIcon />, onClick: () => onOpenTab(5) },
        { title: "Credits Earned", value: formatCurrency(data.totalCreditsEarned), note: "Interest shared with members", tone: "green", icon: <SavingsIcon />, onClick: () => onOpenTab(9) },
        { title: "Eligible Users", value: data.eligibleUsers, note: `Of ${data.totalUsers} total members`, tone: "blue", icon: <HowToRegIcon />, onClick: openMembers },
        { title: "Logged-In Users", value: data.loggedInUsers, note: `${data.loggedInToday} logged in today`, tone: "orange", icon: <LoginIcon /> },
      ]
    : [];

  return (
    <>
      <div className="ad-panel-header ao-kpi-head">
        <h3>Loans and Credits</h3>
        <DateRangeFilter range={range} onChange={setRange} />
      </div>
      {error && <p className="ao-error">{error}</p>}
      {!data && !error && <p className="ao-empty">Loading dashboard...</p>}
      <div className="ad-summary-grid">
        {cards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>
    </>
  );
}

function LoanCreditDetails({ data, range }) {
  const topMax = Math.max(1, ...data.topEarners.map((row) => row.totalCredits));

  return (
    <>
      <div className="ao-three-col">
        <CompletedLoans rows={data.recentCompletedLoans} />
        <div className="ad-panel">
          <div className="ad-panel-header">
            <h3>Top Users by Credits Earned</h3>
          </div>
          {data.topEarners.length === 0 && <p className="ao-empty">No credits in this period</p>}
          {data.topEarners.map((row, index) => (
            <div className="ao-top-row" key={row.userId}>
              <span>
                {index + 1}. {row.name}
              </span>
              <b>{formatCurrency(row.totalCredits)}</b>
              <div className="ao-top-bar">
                <i style={{ width: `${(row.totalCredits / topMax) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <RecentList
          title="Recent Credits"
          rows={data.recentEarnings}
          render={(row) => (
            <>
              <div>
                <strong>{row.name}</strong>
                <small>{row.date}</small>
              </div>
              <b>{formatCurrency(row.amount)}</b>
            </>
          )}
        />
      </div>
      <EarningsRanking range={range} />
    </>
  );
}

function WithdrawalOverview() {
  const [range, setRange] = useState({ from: "", to: "" });
  const [history, setHistory] = useState({ search: "", status: "", page: 1 });
  const [refreshKey, setRefreshKey] = useState(0);

  const overview = useDashboardQuery(OVERVIEW_URL, dropEmpty(range), refreshKey);
  const historyQuery = useDashboardQuery(
    "/loan/dashboard/withdrawals",
    dropEmpty({ ...range, ...history, limit: PAGE_SIZE }),
    refreshKey,
  );

  const data = overview.data;
  const withdrawals = data?.withdrawals;

  const changeRange = (next) => {
    setRange(next);
    setHistory((prev) => ({ ...prev, page: 1 }));
  };

  if (overview.error) return <p className="ao-error">{overview.error}</p>;
  if (!data) return <p className="ao-empty">Loading withdrawals...</p>;

  const cards = [
    { title: "Total Withdrawals", value: formatCurrency(withdrawals.totalAmount), note: `${withdrawals.totalCount} paid transaction${withdrawals.totalCount === 1 ? "" : "s"}`, tone: "rose", icon: <ArrowOutwardIcon /> },
    { title: "This Month's Withdrawals", value: formatCurrency(withdrawals.monthAmount), note: dayjs().format("MMMM YYYY"), tone: "amber", icon: <ArrowOutwardIcon /> },
    { title: "Pending Withdrawals", value: formatCurrency(withdrawals.pendingAmount), note: `${withdrawals.pendingCount} awaiting approval`, tone: "violet", icon: <CreditCardIcon /> },
    { title: "Credits Earned", value: formatCurrency(data.totalCreditsEarned), note: "Interest shared with members", tone: "green", icon: <SavingsIcon /> },
  ];

  return (
    <div className="admin-overview">
      <DateRangeFilter range={range} onChange={changeRange}>
        {(range.from || range.to) && (
          <span className="ao-filter-note">
            In this period: <b>{formatCurrency(withdrawals.filteredAmount)}</b> withdrawn in{" "}
            <b>{withdrawals.filteredCount}</b> transactions.
          </span>
        )}
      </DateRangeFilter>

      <div className="ad-summary-grid">
        {cards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      <div className="ao-two-col">
        <WithdrawalTrend data={data.trend} />
        <RecentList
          title="Recent Withdrawals"
          rows={data.recentWithdrawals}
          render={(row) => (
            <>
              <div>
                <strong>{row.username}</strong>
                <small>
                  {row.date} · {row.status}
                </small>
              </div>
              <b>{formatCurrency(row.amount)}</b>
            </>
          )}
        />
      </div>

      <div className="ao-two-col">
        <div className="ad-panel ao-section">
          <div className="ad-panel-header">
            <h3>User-wise Withdrawals</h3>
          </div>
          <div className="ao-table-wrap">
            <table className="client-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Transactions</th>
                  <th>Last Paid</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.byUser.length === 0 && (
                  <tr>
                    <td colSpan="5">No paid withdrawals in this period</td>
                  </tr>
                )}
                {withdrawals.byUser.map((row) => (
                  <tr key={row.userId}>
                    <td className="bold-score">{row.name}</td>
                    <td title={row.userId}>{shortId(row.userId)}</td>
                    <td>{formatCurrency(row.totalAmount)}</td>
                    <td>{row.count}</td>
                    <td>{formatDay(row.lastWithdrawalDay)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ad-panel ao-section">
          <div className="ad-panel-header">
            <h3>Withdrawal History</h3>
            <div className="ao-inline-filters">
              <select
                aria-label="Withdrawal status"
                value={history.status}
                onChange={(e) => setHistory({ ...history, status: e.target.value, page: 1 })}
              >
                <option value="">All</option>
                <option value="success">Paid</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <input
                className="ao-search"
                type="search"
                placeholder="Search name"
                aria-label="Search withdrawal history"
                value={history.search}
                onChange={(e) => setHistory({ ...history, search: e.target.value, page: 1 })}
              />
            </div>
          </div>
          {historyQuery.error && <p className="ao-error">{historyQuery.error}</p>}
          <div className="ao-table-wrap">
            <table className="client-table">
              <thead>
                <tr>
                  <th>Requested</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Processed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyQuery.data?.results.length === 0 && (
                  <tr>
                    <td colSpan="6">No withdrawals found</td>
                  </tr>
                )}
                {historyQuery.data?.results.map((row) => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td className="bold-score">{row.username}</td>
                    <td>{formatCurrency(row.amount)}</td>
                    <td>{row.status}</td>
                    <td>{row.status === "pending" ? "-" : dayjs(row.updatedAt).format("DD-MM-YYYY")}</td>
                    <td>
                      <RecordActions
                        title="Edit withdrawal"
                        record={row}
                        type="withdraw"
                        fields={row.status === "rejected" ? [] : RECORD_FIELDS.withdraw}
                        deleteNote="Delete this withdrawal? If it was paid, its debit is removed and the amount returns to the member's earnings."
                        onDone={() => setRefreshKey((key) => key + 1)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager data={historyQuery.data} onPage={(page) => setHistory({ ...history, page })} />
        </div>
      </div>

      <LoanCreditDetails data={data} range={range} />
    </div>
  );
}

export default WithdrawalOverview;
