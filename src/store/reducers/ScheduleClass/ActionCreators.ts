import { AppDispatch } from "../../index";
import { getScheduleClassesForAuthenticatedTeacher } from "../../../http/schedule";
import { scheduleClasses } from "./slice";

export const fetchScheduleClassForAuthTeacherAction =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(scheduleClasses.actions.fetchScheduleClasses());
      const res = await getScheduleClassesForAuthenticatedTeacher();
      dispatch(scheduleClasses.actions.fetchScheduleClassesSuccess(res.data));
    } catch (e) {
      dispatch(scheduleClasses.actions.fetchScheduleClassesFailed(e));
    }
  };
