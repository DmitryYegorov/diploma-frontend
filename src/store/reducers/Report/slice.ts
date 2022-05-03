import { createSlice } from "@reduxjs/toolkit";

interface ReportState {
  list: Array<any>;
  selectedReport: any;
  loadedClasses: Array<any>;
  load: Array<any>;
  isLoading: boolean;
  error: string;
}

const initialState: ReportState = {
  list: [],
  selectedReport: {},
  loadedClasses: [],
  load: [],
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

    fetchReport(state) {
      state.isLoading = true;
    },
    fetchReportFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    fetchReportSuccess(state, action) {
      state.isLoading = false;
      state.selectedReport = action.payload;
    },

    loadClasses(state) {
      state.isLoading = true;
    },
    loadClassesSuccess(state, action) {
      state.isLoading = false;
      state.loadedClasses = action.payload.list;
      state.load = action.payload.load;
    },
    loadClassesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    clearLoadedClasses(state) {
      state.loadedClasses = [];
      state.load = [];
    },
  },
});

export default reportSlice.reducer;
