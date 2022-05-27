import { AppDispatch } from "../../index";
import {
  fetchReports,
  fetchReportById,
  fetchOtherLoadToReport,
  calculateReportDataByReportId,
} from "../../../http/report";
import { reportSlice } from "./slice";
import { loadDataToReport } from "../../../http/report";

export const fetchReportsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(reportSlice.actions.fetchReportsByUser());
    const res = await fetchReports();
    dispatch(reportSlice.actions.fetchReportsByUserSuccess(res.data));
  } catch (e) {
    dispatch(reportSlice.actions.fetchReportsByUserFailed(e));
  }
};

export const fetchOneReportAction =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(reportSlice.actions.fetchReport());
      const res = await fetchReportById(id);
      dispatch(reportSlice.actions.fetchReportSuccess(res.data));
    } catch (e) {
      dispatch(reportSlice.actions.fetchReportFailed(e));
    }
  };

export const loadClassesForReportAction =
  (reportId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(reportSlice.actions.loadClasses());
      const res = await loadDataToReport(reportId);
      dispatch(reportSlice.actions.loadClassesSuccess(res.data));
    } catch (e) {
      dispatch(reportSlice.actions.loadClassesFailed(e));
    }
  };

export const clearLoadedClassesAction = () => (dispatch: AppDispatch) => {
  dispatch(reportSlice.actions.clearLoadedClasses());
};

export const calculateReportDataAction =
  (reportId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(reportSlice.actions.calculateReportData());
      const res = await calculateReportDataByReportId(reportId);
      dispatch(reportSlice.actions.calculateReportDataSuccess(res.data));
    } catch (e) {
      dispatch(reportSlice.actions.calculatedReportDataFailed(e));
    }
  };
