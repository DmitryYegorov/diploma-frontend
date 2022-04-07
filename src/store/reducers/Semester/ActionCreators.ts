import { AppDispatch } from "../../index";
import { getCurrentSemester } from "../../../http/semester";
import { semesterSlice } from "./slice";

export const fetchCurrentSemesterAction =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(semesterSlice.actions.fetchCurrentSemester());
      const res = await getCurrentSemester();
      dispatch(semesterSlice.actions.fetchCurrentSemesterSuccess(res.data));
    } catch (e) {
      dispatch(semesterSlice.actions.fetchCurrentSemesterFailed(e));
    }
  };
