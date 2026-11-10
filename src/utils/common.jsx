import * as xlsx from "xlsx"; // ✅ correct

export const generateExcelFileBuffer = (data, filename) => {
  const columnHeaders = Object.keys(data[0]);
  // Create a new workbook and a worksheet
  const workbook = xlsx.utils.book_new();

  const worksheetData = [columnHeaders];

  data.forEach((row) => {
    const dataRow = columnHeaders.map((header) => row[header] || "");
    worksheetData.push(dataRow);
  });

  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);

  xlsx.utils.book_append_sheet(workbook, worksheet, filename);

  const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

  return buffer;
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

// A missing rate shows as "-" rather than a misleading 0%.
export const formatPercent = (value) =>
  value === null || value === undefined || value === "" || Number.isNaN(Number(value))
    ? "-"
    : `${Number(value)}%`;
