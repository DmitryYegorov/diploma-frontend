import { createSlice } from "@reduxjs/toolkit";
import { LoadItemType, ReportData } from "../../../typings/load";

interface ReportState {
  list: Array<any>;
  selectedReport: any;
  calculatedReport: Array<LoadItemType>;
  reportData: Array<ReportData>;
  isLoading: boolean;
  error: string;
}

const initialState: ReportState = {
  list: [],
  selectedReport: {},
  calculatedReport: [],
  reportData: [],
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
      state.isLoading = false;
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
      state.reportData = action.payload.reportData;
      state.calculatedReport = action.payload.calculatedData;
    },

    loadClasses(state) {
      state.isLoading = true;
    },
    loadClassesSuccess(state, action) {
      state.isLoading = false;
      state.reportData = action.payload.list;
    },
    loadClassesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    calculateReportData(state) {
      state.isLoading = true;
    },
    calculateReportDataSuccess(state, action) {
      state.isLoading = false;
      state.calculatedReport = action.payload;
    },
    calculatedReportDataFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setCalculatedReportData(state, action) {
      state.calculatedReport = action.payload;
    },

    clearLoadedClasses(state) {
      state.reportData = [];
    },
  },
});

export default reportSlice.reducer;
