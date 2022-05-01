import { createSlice } from "@reduxjs/toolkit";

interface ReportState {
  list: Array<any>;
  isLoading: boolean;
  error: string;
}

const initialState: ReportState = {
  list: [],
  isLoading: false,
  error: "",
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    fetchReportsByUser(state) {
      state.isLoading = true;
    },
    fetchReportsByUserSuccess(state, action) {
      state.list = action.payload.list;
      state.isLoading = true;
    },
    fetchReportsByUserFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default reportSlice.reducer;
