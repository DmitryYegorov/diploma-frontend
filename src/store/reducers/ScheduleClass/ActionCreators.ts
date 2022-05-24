import { AppDispatch } from "../../index";
import {
  fetchScheduleClassById,
  getScheduleClassesBySemesterId,
  getScheduleDepartmentBySemester,
} from "../../../http/schedule";
import { scheduleClasses } from "./slice";

export const fetchScheduleClassesOfTeacherBySemesterId =
  (semesterId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(scheduleClasses.actions.fetchScheduleClasses());
      const res = await getScheduleClassesBySemesterId(semesterId);
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

export const fetchOneClassByIdAction =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(scheduleClasses.actions.fetchOneClassById());
      const res = await fetchScheduleClassById(id);
      dispatch(scheduleClasses.actions.fetchOneClassByIdSuccess(res.data));
    } catch (e) {
      dispatch(scheduleClasses.actions.fetchOneClassByIdFailed(e));
    }
  };
