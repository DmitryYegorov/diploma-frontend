import { AppDispatch } from "../../index";
import { getAllEvents } from "../../../http/event";
import { eventsSlice } from "./slice";

export const fetchAllEventsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(eventsSlice.actions.fetchEvents());
    const res = await getAllEvents();
    dispatch(eventsSlice.actions.fetchEventsSuccess(res.data));
  } catch (e) {
    dispatch(eventsSlice.actions.fetchEventsFailed(e));
  }
};
