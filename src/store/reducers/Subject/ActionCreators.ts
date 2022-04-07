import { AppDispatch } from "../../index";
import { addNewSubject, getSubjectsList } from "../../../http/subject";
import { subjectSlice } from "./slice";
import { Subject } from "../../../models/Subject";

export const fetchSubjectsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(subjectSlice.actions.fetchSubjects());
    const res = await getSubjectsList();
    dispatch(subjectSlice.actions.fetchSubjectsSuccess(res.data));
  } catch (e) {
    dispatch(subjectSlice.actions.fetchSubjectsFailed(e));
  }
};

export const createSubjectAction =
  (data: Subject) => async (dispatch: AppDispatch) => {
    try {
      dispatch(subjectSlice.actions.createSubjectFetch());
      const res = await addNewSubject(data);
      dispatch(subjectSlice.actions.createSubjectSuccess(res.data));
      dispatch(fetchSubjectsAction());
    } catch (e) {
      dispatch(subjectSlice.actions.createSubjectFailed(e));
    }
  };
