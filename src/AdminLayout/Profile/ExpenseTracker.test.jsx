import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as XLSX from "xlsx";
import Axios from "../../api/axiosInterCepter";
import ExpenseTracker from "./ExpenseTracker";

jest.mock("../../api/axiosInterCepter", () => ({ get: jest.fn() }));
jest.mock("xlsx", () => {
  const actual = jest.requireActual("xlsx");
  return { ...actual, writeFile: jest.fn() };
});

const expense = (id, date, options = {}) => ({
  _id: String(id), date, amount: 100.25,
  debitType: { _id: "rent", name: "Rent" },
  isPlanned: false, completed: false, ...options,
});
const entries = [
  ...Array.from({ length: 8 }, (_, index) => expense(index, `2026-11-${String(index + 1).padStart(2, "0")}`)),
  expense(10, "2026-11-30", { isPlanned: true }),
  expense(11, "2026-10-01"),
  expense(12, "2026-12-01", { isPlanned: true, completed: true }),
  expense(13, "2026-12-05", { isPlanned: true }),
  expense(14, "2026-01-01"),
  expense(15, "2025-12-01"),
  expense(16, "2026-11-01", { isPlanned: true }),
];

beforeEach(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date("2026-11-25T12:00:00Z"));
  jest.clearAllMocks();
  Axios.get.mockResolvedValue({ data: { expenses: entries, incomes: [], types: [] } });
});
afterEach(() => jest.useRealTimers());

async function openTracker(props = {}) {
  render(<ExpenseTracker {...props} />);
  await screen.findByRole("button", { name: "Export Excel" });
}
async function exportedRows() {
  fireEvent.click(screen.getByRole("button", { name: "Export Excel" }));
  await waitFor(() => expect(XLSX.writeFile).toHaveBeenCalledTimes(1));
  const [workbook, filename] = XLSX.writeFile.mock.calls[0];
  return { rows: XLSX.utils.sheet_to_json(workbook.Sheets.Expenses), filename, sheet: workbook.Sheets.Expenses };
}

test("exports all matching monthly entries across pages, with numeric amounts", async () => {
  await openTracker();
  const { rows, filename, sheet } = await exportedRows();
  expect(rows).toHaveLength(10);
  expect(rows.every(row => row.Date.startsWith("2026-11"))).toBe(true);
  expect(rows[0]).toEqual({ Date: "2026-11-01", "Debit type": "Rent", "Amount (INR)": 100.25, Status: "Done" });
  expect(sheet.C2.t).toBe("n");
  expect(sheet.C2.z).toBe("#,##0.00");
  expect(filename).toBe("expenses-2026-11-all.xlsx");
});

test("exports quarter and upcoming status filters together in admin view", async () => {
  await openTracker({ userId: "another-user", readOnly: true });
  fireEvent.click(screen.getByRole("button", { name: "Q4" }));
  fireEvent.change(screen.getByRole("combobox", { name: "Filter by status" }), { target: { value: "planned" } });
  const { rows, filename } = await exportedRows();
  expect(rows.map(row => row.Date)).toEqual(["2026-11-30", "2026-12-05"]);
  expect(rows.every(row => row.Status === "Planned")).toBe(true);
  expect(filename).toBe("expenses-2026-Q4-planned.xlsx");
});

test("exports yearly done expenses including completed and elapsed plans", async () => {
  await openTracker();
  fireEvent.click(screen.getByRole("button", { name: "year" }));
  fireEvent.change(screen.getByRole("combobox", { name: "Filter by status" }), { target: { value: "done" } });
  const { rows, filename } = await exportedRows();
  expect(rows).toHaveLength(12);
  expect(rows.every(row => row.Status === "Done" && row.Date.startsWith("2026"))).toBe(true);
  expect(rows.some(row => row.Date === "2026-12-01")).toBe(true);
  expect(filename).toBe("expenses-2026-done.xlsx");
});

test("disables export when no entries match", async () => {
  Axios.get.mockResolvedValue({ data: { expenses: [], incomes: [], types: [] } });
  await openTracker();
  expect(screen.getByRole("button", { name: "Export Excel" })).toBeDisabled();
  expect(XLSX.writeFile).not.toHaveBeenCalled();
});

test("shows an export error and allows retry", async () => {
  await openTracker();
  XLSX.writeFile.mockImplementationOnce(() => { throw new Error("Download failed"); });
  fireEvent.click(screen.getByRole("button", { name: "Export Excel" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Unable to export expenses. Please try again.");
  expect(screen.getByRole("button", { name: "Export Excel" })).toBeEnabled();
});
