import { AppDispatch } from "../../index";
import {
  getList,
  getSemesterById,
  getAcademicYears,
} from "../../../http/semester";
import { semesterSlice } from "./slice";

export const fetchSemesterAction =
  (semesterId = "current") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(semesterSlice.actions.fetchSemester());
      const res = await getSemesterById(semesterId);
      dispatch(semesterSlice.actions.fetchSemesterSuccess(res.data));
    } catch (e) {
      dispatch(semesterSlice.actions.fetchSemesterFailed(e));
    }
  };

export const fetchSemestersAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(semesterSlice.actions.fetchList());
    const res = await getList();
    dispatch(semesterSlice.actions.fetchListSuccess(res.data));
  } catch (e) {
    dispatch(semesterSlice.actions.fetchListFailed(e));
  }
};

export const fetchAcademicYearsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(semesterSlice.actions.fetchAcademicYears());
    const res = await getAcademicYears();
    dispatch(semesterSlice.actions.fetchAcademicYearsSuccess(res.data));
  } catch (e) {
    dispatch(semesterSlice.actions.fetchAcademicYearsFailed(e));
  }
};
