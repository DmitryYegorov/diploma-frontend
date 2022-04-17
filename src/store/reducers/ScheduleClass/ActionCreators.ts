import { AppDispatch } from "../../index";
import {
  getScheduleClassesForAuthenticatedTeacher,
  getScheduleDepartmentBySemester,
} from "../../../http/schedule";
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

export const fetchScheduleClassofDepartmentBySemesterIdAction =
  (semesterId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(scheduleClasses.actions.fetchScheduleClassesOfDepartment());
      const res = await getScheduleDepartmentBySemester(semesterId);
      dispatch(
        scheduleClasses.actions.fetchScheduleClassesOfDepartmentSuccess(
          res.data
        )
      );
    } catch (e) {
      dispatch(
        scheduleClasses.actions.fetchScheduleClassesOfDepartmentFailed(e)
      );
    }
  };
