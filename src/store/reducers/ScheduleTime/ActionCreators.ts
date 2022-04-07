import { AppDispatch } from "../../index";
import { getTimes } from "../../../http/schedule";
import { scheduleTime } from "./slice";

export const fetchScheduleTimesAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleTime.actions.fetchScheduleTime());
    const res = await getTimes();
    dispatch(scheduleTime.actions.fetchScheduleTimeSuccess(res.data));
  } catch (e) {
    dispatch(scheduleTime.actions.fetchScheduleTimeFailed(e));
  }
};
