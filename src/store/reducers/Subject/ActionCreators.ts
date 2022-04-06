import { AppDispatch } from "../../index";
import { getSubjectsList } from "../../../http/subject";
import { subjectSlice } from "./slice";

export const fetchSubjectsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(subjectSlice.actions.fetchSubjects());
    const res = await getSubjectsList();
    dispatch(subjectSlice.actions.fetchSubjectsSuccess(res.data));
  } catch (e) {
    dispatch(subjectSlice.actions.fetchSubjectsFailed(e));
  }
};
