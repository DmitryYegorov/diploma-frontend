import { AppDispatch } from "../../index";
import { eventsSlice } from "./slice";
import { getScheduleClassesToCalendar } from "../../../http/schedule";

export const fetchAllClassesAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(eventsSlice.actions.fetchEvents());
    const res = await getScheduleClassesToCalendar();
    dispatch(eventsSlice.actions.fetchEventsSuccess(res.data));
  } catch (e) {
    dispatch(eventsSlice.actions.fetchEventsFailed(e));
  }
};
