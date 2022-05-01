import { AppDispatch } from "../../index";
import { fetchReports } from "../../../http/report";
import { reportSlice } from "./slice";

export const fetchReportsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(reportSlice.actions.fetchReportsByUser());
    const res = await fetchReports();
    dispatch(reportSlice.actions.fetchReportsByUserSuccess(res.data));
  } catch (e) {
    dispatch(reportSlice.actions.fetchReportsByUserFailed(e));
  }
};
