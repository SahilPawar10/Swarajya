/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInterCepter";

/* ================= INITIAL STATE ================= */

const initialState = {
  credits: [],
  debits: [],
  installments: [],
  activeLoans: [],
  dashboard: null,
  monthly: [],
  contribution: [],

  status: {
    credits: "idle",
    debits: "idle",
    installments: "idle",
    activeLoans: "idle",
    dashboard: "idle",
    monthly: "idle",
    contribution: "idle",
    addVehicle: "idle",
  },

  error: null,
};

/* ================= ASYNC THUNKS ================= */

export const fetchCredits = createAsyncThunk(
  "accounts/getCredits",
  async () => {
    const res = await axiosInstance.get("/loan/credits");
    return res.data;
  }
);

export const fetchDebits = createAsyncThunk("accounts/getDebits", async () => {
  const res = await axiosInstance.get("/loan/debits");
  return res.data;
});

export const fetchInstallments = createAsyncThunk(
  "accounts/getInstallments",
  async () => {
    const res = await axiosInstance.get("/loan/installment");
    return res.data;
  }
);

export const fetchActiveLoans = createAsyncThunk(
  "accounts/getSummary",
  async () => {
    const res = await axiosInstance.get("/loan/get-summary");
    return res.data;
  }
);

export const fetchDashBoardReport = createAsyncThunk(
  "accounts/dashBoardData",
  async () => {
    const res = await axiosInstance.get("/loan/dashBoardData");
    console.log(res.data, "res");

    return res.data;
  }
);

export const fetchMonthly = createAsyncThunk("accounts/monthly", async () => {
  const res = await axiosInstance.get("/loan/monthly");
  return res.data;
});

export const fetchContribution = createAsyncThunk(
  "accounts/contribution",
  async () => {
    const res = await axiosInstance.get("/loan/contribution");

    return res.data;
  }
);

export const addVehicleEntry = createAsyncThunk(
  "vehicle/addVehicleEntry",
  async ({ payload, headers }) => {
    const res = await axiosInstance.post("/vehicle", payload, { headers });
    return res.data;
  }
);

/* ================= SLICE ================= */

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // -------- CREDITS --------
      .addCase(fetchCredits.pending, (state) => {
        state.status.credits = "loading";
        state.error = null;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.status.credits = "succeeded";
        state.credits = action.payload;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.status.credits = "failed";
        state.error = action.error.message;
      })

      // -------- DEBITS --------
      .addCase(fetchDebits.pending, (state) => {
        state.status.debits = "loading";
        state.error = null;
      })
      .addCase(fetchDebits.fulfilled, (state, action) => {
        state.status.debits = "succeeded";
        state.debits = action.payload;
      })
      .addCase(fetchDebits.rejected, (state, action) => {
        state.status.debits = "failed";
        state.error = action.error.message;
      })

      // -------- INSTALLMENTS --------
      .addCase(fetchInstallments.pending, (state) => {
        state.status.installments = "loading";
        state.error = null;
      })
      .addCase(fetchInstallments.fulfilled, (state, action) => {
        state.status.installments = "succeeded";
        state.installments = action.payload;
      })
      .addCase(fetchInstallments.rejected, (state, action) => {
        state.status.installments = "failed";
        state.error = action.error.message;
      })

      // -------- ACTIVE LOANS --------
      .addCase(fetchActiveLoans.pending, (state) => {
        state.status.activeLoans = "loading";
        state.error = null;
      })
      .addCase(fetchActiveLoans.fulfilled, (state, action) => {
        state.status.activeLoans = "succeeded";
        state.activeLoans = action.payload;
      })
      .addCase(fetchActiveLoans.rejected, (state, action) => {
        state.status.activeLoans = "failed";
        state.error = action.error.message;
      })

      // -------- DASHBOARD --------
      .addCase(fetchDashBoardReport.pending, (state) => {
        state.status.dashboard = "loading";
        state.error = null;
      })
      .addCase(fetchDashBoardReport.fulfilled, (state, action) => {
        state.status.dashboard = "succeeded";
        state.dashboard = action.payload;
      })
      .addCase(fetchDashBoardReport.rejected, (state, action) => {
        state.status.dashboard = "failed";
        state.error = action.error.message;
      })

      // -------- MONTHLY --------
      .addCase(fetchMonthly.pending, (state) => {
        state.status.monthly = "loading";
        state.error = null;
      })
      .addCase(fetchMonthly.fulfilled, (state, action) => {
        state.status.monthly = "succeeded";
        state.monthly = action.payload;
      })
      .addCase(fetchMonthly.rejected, (state, action) => {
        state.status.monthly = "failed";
        state.error = action.error.message;
      })

      // -------- CONTRIBUTION --------
      .addCase(fetchContribution.pending, (state) => {
        state.status.contribution = "loading";
        state.error = null;
      })
      .addCase(fetchContribution.fulfilled, (state, action) => {
        state.status.contribution = "succeeded";
        state.contribution = action.payload;
      })
      .addCase(fetchContribution.rejected, (state, action) => {
        state.status.contribution = "failed";
        state.error = action.error.message;
      })

      // -------- ADD VEHICLE --------
      .addCase(addVehicleEntry.pending, (state) => {
        state.status.addVehicle = "loading";
        state.error = null;
      })
      .addCase(addVehicleEntry.fulfilled, (state) => {
        state.status.addVehicle = "succeeded";
      })
      .addCase(addVehicleEntry.rejected, (state, action) => {
        state.status.addVehicle = "failed";
        state.error = action.error.message;
      });
  },
});

/* ================= SELECTORS ================= */

export const selectCredits = (state) => state.accounts.credits;
export const selectDebits = (state) => state.accounts.debits;
export const selectInstallments = (state) => state.accounts.installments;
export const selectActiveLoans = (state) => state.accounts.activeLoans;
export const selectDashboard = (state) => state.accounts.dashboard;
export const selectMonthly = (state) => state.accounts.monthly;
export const selectContribution = (state) => state.accounts.contribution;
export const selectStatus = (state) => state.accounts.status;
export const selectError = (state) => state.accounts.error;

/* ================= EXPORT ================= */

export default accountSlice.reducer;
