import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slices/acccount.slice"; // adjust path if needed

const store = configureStore({
  reducer: {
    accounts: accountReducer,
  },
});

export default store;
