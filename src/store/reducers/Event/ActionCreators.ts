import { AppDispatch } from "../../index";
import { eventsSlice } from "./slice";
import {
  getScheduleClassesToCalendar,
  getUpdatesLogs,
} from "../../../http/schedule";

export const fetchAllClassesAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(eventsSlice.actions.fetchEvents());
    const res = await getScheduleClassesToCalendar();
    dispatch(eventsSlice.actions.fetchEventsSuccess(res.data));
  } catch (e) {
    dispatch(eventsSlice.actions.fetchEventsFailed(e));
  }
};

export const fetchUpdateLogsAction =
  (startDate: Date | string, endDate: Date | string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(eventsSlice.actions.fetchEvents());
      const res = await getUpdatesLogs(startDate, endDate);
      dispatch(eventsSlice.actions.fetchUpdateLogsSuccess(res.data));
    } catch (e) {
      dispatch(eventsSlice.actions.fetchEventsFailed(e));
    }
  };
