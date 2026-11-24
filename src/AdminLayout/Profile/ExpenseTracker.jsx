import React, { useEffect, useState } from "react";
import Axios from "../../api/axiosInterCepter";
import "./expenseTracker.css";

const sample = [["Rent",9000],["Home",5500],["Gas",1000],["Light bill",1500],["Maintainance",700],["Richarge",1300],["Emi",6360],["Metro",1400],["Furniture Loan",1000],["Swarajya monthly",300],["Rail Pass",265],["Hair care",2000],["Hair cutting",500]];
const money = value => new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:2}).format(value);
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };

export default function ExpenseTracker({ userId, readOnly = false }) {
  const [month,setMonth] = useState(today().slice(0,7));
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [clockDate, setClockDate] = useState(today());
  useEffect(() => { const timer = setInterval(() => setClockDate(today()), 30000); return () => clearInterval(timer); }, []);
  const [period,setPeriod] = useState("month");
  const [data,setData] = useState(null);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
  const [busy,setBusy] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [open,setOpen] = useState(false);
  const [form,setForm] = useState({date:today(),amount:"",debitType:""});
  const [selected, setSelected] = useState({});
  const [batchMessage, setBatchMessage] = useState("");
  const [revision,setRevision] = useState(0);
  const year = Number(month.slice(0,4));
  useEffect(() => {
    let active = true;
    setLoading(true); setData(null); setError("");
    Axios.get("/expenses", {params:{year,userId}}).then(res => {if(active) setData(res.data);}).catch(e => {if(active) setError(e.response?.data?.message || "Unable to load expenses. Please retry.");}).finally(() => {if(active) setLoading(false);});
    return () => {active=false;};
  },[year,userId,revision]);
  useEffect(() => { setSelected({}); setBatchMessage(""); }, [month, userId]);
  useEffect(() => { setPage(1); }, [month, period, userId, statusFilter]);
  const isDone = e => !e.isPlanned || e.completed || e.date <= clockDate;
  useEffect(() => { setOpen(false); setEditingId(null); }, [userId]);
  const expenses = data?.expenses || [];
  const income = (data?.incomes || []).find(entry => entry.month === month);
  useEffect(() => { setIncomeOpen(false); }, [month, userId]);
  const monthIndex = Number(month.slice(5,7));
  const nextMonthDate = new Date(year, monthIndex, 1);
  const nextMonthKey = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth()+1).padStart(2,"0")}`;
  const nextMonthPlans = expenses.filter(e => e.date.startsWith(nextMonthKey) && !isDone(e));
  const nextMonthTotal = nextMonthPlans.reduce((sum,e) => sum + e.amount, 0);
  const quarter = Math.floor((monthIndex-1)/3);
  const inPeriod = e => e.date.startsWith(String(year)) && (period === "year" || (period === "month" ? e.date.startsWith(month) : Math.floor((Number(e.date.slice(5,7))-1)/3) === quarter));
  const rows = expenses.filter(inPeriod);
  const doneRows = rows.filter(isDone);
  const plannedTotal = rows.filter(e => !isDone(e)).reduce((sum, e) => sum + e.amount, 0);
  const filteredRows = rows.filter(e => statusFilter === "all" || (statusFilter === "done" ? isDone(e) : !isDone(e)));
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / 6));
  const currentPage = Math.min(page, pageCount);
  const visibleRows = filteredRows.slice((currentPage - 1) * 6, currentPage * 6);
  const total = doneRows.reduce((sum,e)=>sum+e.amount,0);
  const current = expenses.filter(e=>e.date.startsWith(month) && isDone(e)).reduce((sum,e)=>sum+e.amount,0);
  const previousDate = new Date(year,monthIndex-2,1);
  const previousKey = `${previousDate.getFullYear()}-${String(previousDate.getMonth()+1).padStart(2,"0")}`;
  const previous = expenses.filter(e=>e.date.startsWith(previousKey) && isDone(e)).reduce((sum,e)=>sum+e.amount,0);
  const previousRows = expenses.filter(e => e.date.startsWith(previousKey) && e.debitType?.name);
  const previousTypes = Object.values(previousRows.reduce((acc, entry) => {
    const key = entry.debitType._id;
    if (!acc[key]) acc[key] = { name: entry.debitType.name, amount: 0 };
    acc[key].amount += entry.amount;
    return acc;
  }, {}));
  const suggestions = previousTypes.length ? previousTypes : sample.map(([name, amount]) => ({ name, amount }));
  const selectedItems = Object.entries(selected);
  const selectionTotal = selectedItems.reduce((sum, [, amount]) => sum + Number(amount || 0), 0);
  async function saveSelected() {
    if (!selectedItems.length) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date) || form.date < "2000-01-01" || form.date > "2100-12-31") {
      setError("Choose a valid payment date first."); return;
    }
    if (selectedItems.some(([, amount]) => !Number.isFinite(Number(amount)) || Number(amount) <= 0 || Number(amount) > 100000000 || Math.abs(Number(amount) * 100 - Math.round(Number(amount) * 100)) > 0.00001)) {
      setError("Enter a positive amount with at most two decimal places for each selected expense."); return;
    }
    setBusy(true); setError(""); setBatchMessage("");
    let saved = 0;
    try {
      for (const [debitType, amount] of selectedItems) {
        await Axios.post("/expenses", { date: form.date, debitType, amount: Number(amount), isPlanned: !!form.isPlanned });
        saved += 1;
        setSelected(current => { const next = {...current}; delete next[debitType]; return next; });
      }
      setBatchMessage(`Added ${saved} expenses.`);
    } catch (e) {
      setError(`Added ${saved} expenses. ${e.response?.data?.message || "Could not save the next expense."} The remaining selections are ready to retry.`);
    } finally {
      try { const response = await Axios.get("/expenses", {params: {year, userId}}); setData(response.data); }
      catch { setError(current => current + " Refresh the page to see saved expenses."); }
      setBusy(false);
    }
  }
  const groups = Object.values(doneRows.reduce((acc,e)=>{const id=e.debitType?._id || "unknown"; if(!acc[id]) acc[id]={name:e.debitType?.name || "Unknown",total:0}; acc[id].total+=e.amount; return acc;},{})).sort((a,b)=>b.total-a.total);
  async function save(event) {
    event.preventDefault(); setBusy(true); setError("");
    try {const payload = {...form,amount:Number(form.amount),isPlanned:!!form.isPlanned}; if(editingId) await Axios.patch(`/expenses/${editingId}`,payload); else await Axios.post("/expenses",payload); setEditingId(null); setMonth(form.date.slice(0,7)); setOpen(false); setForm({...form,amount:""}); setRevision(v=>v+1);}
    catch(e){setError(e.response?.data?.message || "Unable to save expense.");} finally {setBusy(false);}
  }
  async function saveIncome(event) {
    event.preventDefault(); setBusy(true); setError("");
    try { await Axios.patch("/expenses/income", {month, amount:Number(incomeAmount)}); setIncomeOpen(false); setRevision(v=>v+1); }
    catch(e) { setError(e.response?.data?.message || "Unable to save monthly income."); }
    finally { setBusy(false); }
  }
  async function remove(id) {
    if(!window.confirm("Delete this expense?")) return;
    setBusy(true); setError("");
    try {await Axios.delete(`/expenses/${id}`); setRevision(v=>v+1);} catch(e){setError(e.response?.data?.message || "Unable to delete expense.");} finally {setBusy(false);}
  }
  async function markDone(id) {
    setBusy(true); setError("");
    try { await Axios.patch(`/expenses/${id}/done`, {}); setRevision(v => v + 1); }
    catch (e) { setError(e.response?.data?.message || "Unable to mark expense done."); }
    finally { setBusy(false); }
  }
  function editExpense(expense) {
    setEditingId(expense._id);
    setForm({date:expense.date,amount:expense.amount,debitType:expense.debitType?.name || "",isPlanned:!!expense.isPlanned});
    setSelected({}); setBatchMessage(""); setError(""); setOpen(true);
  }
  function planNextMonth() {
    setEditingId(null);
    const next = new Date(year, monthIndex, 1);
    const nextMonth = `${next.getFullYear()}-${String(next.getMonth()+1).padStart(2,"0")}`;
    setMonth(nextMonth); setSelected({}); setBatchMessage("");
    setForm({date: `${nextMonth}-01`,amount:"",debitType:"",isPlanned:true});
    setOpen(true);
  }
  const change = e => setForm({...form,[e.target.name]:e.target.type === "checkbox" ? e.target.checked : e.target.value});
  return <section className="expense-panel" aria-label="Personal expenses">
    <header><div><span className="expense-eyebrow">YOUR MONEY, IN VIEW</span><h2>Expense tracker</h2><p>Track every debit. Understand your monthly rhythm.</p></div>{!readOnly && <button disabled={busy || loading} onClick={()=>{setEditingId(null);setForm({date:`${month}-01`,amount:"",debitType:""});setSelected({});setBatchMessage("");setOpen(!open);}}>+ Add expense</button>}</header>
    <div className="expense-toolbar">
      <div className="expense-period-controls"><label>Month<input type="month" disabled={busy} min="2000-01" max="2100-12" value={month} onChange={e=>{if(e.target.value) setMonth(e.target.value);}} /></label>
      <div className="expense-tabs" aria-label="Spending period">{["month","quarter","year"].map(p=><button type="button" key={p} aria-pressed={period===p} onClick={()=>setPeriod(p)}>{p === "quarter" ? `Q${quarter+1}` : p}</button>)}</div></div>
      {!readOnly && <div className="expense-toolbar-actions"><button className="expense-secondary" type="button" disabled={busy || loading} onClick={()=>{setIncomeAmount(income?.amount ?? "");setIncomeOpen(!incomeOpen);}}>{income ? "Edit income" : "Set monthly income"}</button><button className="expense-secondary" type="button" disabled={busy || loading || month >= "2100-12"} onClick={planNextMonth}>Plan next month →</button></div>}
      {readOnly && <span>Admin view · read only</span>}
    </div>
    {error && <div role="alert" className="expense-error">{error} <button onClick={()=>setRevision(v=>v+1)}>Retry</button></div>}
    {loading ? <p role="status">Loading expenses…</p> : data && <>
    {incomeOpen && !readOnly && <form className="expense-income-form" onSubmit={saveIncome}>
      <label>Income for {month} (₹)<input autoFocus required type="number" min="0" max="100000000" step="0.01" value={incomeAmount} onChange={e=>setIncomeAmount(e.target.value)}/></label>
      <button disabled={busy}>{busy ? "Saving…" : "Save income"}</button><button type="button" className="expense-secondary" disabled={busy} onClick={()=>setIncomeOpen(false)}>Cancel</button>
    </form>}
    <div className="expense-stats">
      <article><small>{period === "month" ? "Month" : period === "quarter" ? `Q${quarter+1}` : "Year"} spending</small><strong>{money(total)}</strong><span>{doneRows.length} completed expenses</span></article>
      <article className="expense-income-card"><small>Monthly income · {month}</small><strong>{income ? money(income.amount) : "Not set"}</strong><span>{income ? `${money(income.amount-current)} left after spending` : "Enter income to track your balance"}</span></article>
      <article><small>Upcoming fixed expenses</small><strong>{money(plannedTotal)}</strong><span>{rows.filter(e => !isDone(e)).length} scheduled in this period</span></article>
      <article><small>Previous month · {previousKey}</small><strong>{money(previous)}</strong><span>{previous ? `${Math.abs((current-previous)/previous*100).toFixed(1)}% ${current>=previous ? "more" : "less"} this month` : "No previous month expenses"}</span></article>
    </div>
    {!open && nextMonthPlans.length > 0 && <div className="expense-upcoming-banner">
      <div><strong>Planned for {nextMonthDate.toLocaleDateString("en-IN",{month:"long",year:"numeric"})}</strong><span>{nextMonthPlans.length} fixed expenses · {money(nextMonthTotal)} upcoming</span></div>
      <button type="button" disabled={busy} onClick={()=>{setMonth(nextMonthKey);setPeriod("month");setStatusFilter("planned");setPage(1);}}>View planned expenses →</button>
    </div>}
    {open && !readOnly && <form onSubmit={save} className="expense-form"><h3 className="expense-form-title">{editingId ? "Edit expense" : "Add expenses"}</h3><label className="expense-plan-toggle"><input type="checkbox" name="isPlanned" checked={!!form.isPlanned} onChange={change}/>Planned fixed expense</label><label>{form.isPlanned ? "Scheduled date" : "Date"}<input required type="date" name="date" min="2000-01-01" max="2100-12-31" value={form.date} onChange={change}/></label><label>Debit type<input required maxLength={80} name="debitType" list="expense-types" value={form.debitType} onChange={change} placeholder="Choose saved type or add one"/></label><datalist id="expense-types">{(data.types || []).map(t=><option key={t._id} value={t.name}/>)}</datalist><label>Amount (₹)<input required type="number" name="amount" min="0.01" max="100000000" step="0.01" value={form.amount} onChange={change}/></label><button disabled={busy}>{busy ? "Saving…" : editingId ? "Save changes" : "Save expense"}</button><button type="button" className="expense-secondary" onClick={()=>setOpen(false)}>Close</button><p>{form.isPlanned && "Planned expenses become done automatically on their scheduled date. "}Reuse a saved debit type to keep quarterly and yearly totals consistent.</p>{!editingId && <fieldset className="expense-batch" disabled={busy}>
      <legend>{previousTypes.length ? `Previous month debit types · ${previousKey}` : "Sample monthly expenses"}</legend>
      <p>{previousTypes.length ? "Amounts are totals from the previous month. Adjust them before adding." : "No expenses in the previous month. Use these samples or enter your own debit type."} Selected expenses use the payment date above.</p>
      <div className="expense-batch-actions">
        <button type="button" className="expense-secondary" onClick={() => setSelected(Object.fromEntries(suggestions.map(item => [item.name, item.amount])))}>Select all</button>
        <button type="button" className="expense-secondary" onClick={() => setSelected({})}>Clear selection</button>
      </div>
      <div className="expense-batch-list">{suggestions.map(item => {
        const checked = Object.prototype.hasOwnProperty.call(selected, item.name);
        return <div className="expense-batch-row" key={item.name}>
          <label><input type="checkbox" checked={checked} onChange={event => setSelected(current => {
            const next = {...current}; if (event.target.checked) next[item.name] = item.amount; else delete next[item.name]; return next;
          })}/>{item.name}</label>
          <input type="number" aria-label={`Amount for ${item.name}`} min="0.01" max="100000000" step="0.01" disabled={!checked} value={checked ? selected[item.name] : item.amount} onChange={event => setSelected({...selected, [item.name]: event.target.value})}/>
        </div>;
      })}</div>
      <div className="expense-batch-actions"><strong>{selectedItems.length} selected · {money(selectionTotal)}</strong><button type="button" disabled={busy || !selectedItems.length} onClick={saveSelected}>{busy ? "Saving…" : `Add selected (${selectedItems.length})`}</button></div>
      {batchMessage && <p role="status">{batchMessage}</p>}
    </fieldset>}</form>}
    {!open && <div className="expense-content">
      <div className="expense-history">
        <div className="expense-history-head"><div><h3>Expense history</h3><span>{filteredRows.length} entries · {period === "month" ? month : period === "quarter" ? `Q${quarter+1} ${year}` : year}</span></div>
          <label className="expense-history-filter"><span className="expense-sr-only">Filter by status</span><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option value="all">All expenses</option><option value="planned">Upcoming fixed expenses</option><option value="done">Done</option></select></label>
        </div>
        <div className="expense-table"><table><thead><tr><th>Date</th><th>Debit type</th><th className="expense-amount">Amount</th><th>Status</th>{!readOnly && <th className="expense-actions">Action</th>}</tr></thead><tbody>{visibleRows.map(e=><tr key={e._id} className={!isDone(e) ? "expense-row-upcoming" : undefined}>
          <td>{e.date}</td><td>{e.debitType?.name}</td><td className="expense-amount">{money(e.amount)}</td><td><span className={isDone(e) ? "expense-status-done" : "expense-status-planned"}>{isDone(e) ? "Done" : "Planned"}</span></td>
          {!readOnly && <td className="expense-actions"><button className="expense-edit" disabled={busy} onClick={()=>editExpense(e)} aria-label={`Edit ${e.debitType?.name} on ${e.date}`}>Edit</button> {!isDone(e) && <button className="expense-done" disabled={busy} onClick={()=>markDone(e._id)}>Mark done</button>} <button className="expense-delete" disabled={busy} onClick={()=>remove(e._id)} aria-label={`Delete ${e.debitType?.name} on ${e.date}`}>Delete</button></td>}
        </tr>)}</tbody></table>{!filteredRows.length && <div className="expense-empty">No expenses in this view.</div>}</div>
        <div className="expense-pagination"><span>{filteredRows.length ? `${(currentPage-1)*6+1}–${Math.min(currentPage*6,filteredRows.length)} of ${filteredRows.length}` : "0 entries"}</span><div><button disabled={currentPage === 1} onClick={()=>setPage(currentPage-1)}>← Previous</button><span>{currentPage} / {pageCount}</span><button disabled={currentPage === pageCount} onClick={()=>setPage(currentPage+1)}>Next →</button></div></div>
      </div>
      <details className="expense-breakdown-section"><summary>Spending by debit type <span>{groups.length} types · view breakdown</span></summary>
        <div className="expense-breakdown-grid">{groups.length ? groups.map(g=><div className="expense-breakdown" key={g.name}><div><span>{g.name}</span><b>{money(g.total)}</b></div><div className="expense-bar" role="meter" aria-label={`${g.name} spending`} aria-valuemin={0} aria-valuemax={total} aria-valuenow={g.total}><span style={{width: `${total ? g.total/total*100 : 0}%`}} /></div></div>) : <p>No completed expenses in this period.</p>}</div>
      </details>
    </div>}
    </>}
  </section>;
}
