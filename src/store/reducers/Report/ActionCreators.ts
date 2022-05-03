import { AppDispatch } from "../../index";
import { fetchReports, fetchReportById } from "../../../http/report";
import { reportSlice } from "./slice";
import { loadScheduleClassesToReport } from "../../../http/schedule";

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
      const res = await loadScheduleClassesToReport(reportId);
      dispatch(reportSlice.actions.loadClassesSuccess(res.data));
    } catch (e) {
      dispatch(reportSlice.actions.loadClassesFailed(e));
    }
  };

export const clearLoadedClassesAction = () => (dispatch: AppDispatch) =>
  dispatch(reportSlice.actions.clearLoadedClasses());
