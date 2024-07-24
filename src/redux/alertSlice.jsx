import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearAlerts: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
    },
  },
});

export const {
  showLoading,
  hideLoading,
  setError,
  setMessage,
  clearAlerts,
} = alertSlice.actions;

export default alertSlice.reducer;