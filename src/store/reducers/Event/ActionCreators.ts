import { AppDispatch } from "../../index";
import { getAllEvents, addNewEvent } from "../../../http/event";
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

export const addNewAppointmentAction =
  (data: any) => async (dispatch: AppDispatch) => {
    await addNewEvent(data);
    dispatch(fetchAllEventsAction());
  };

export const changeAppointmentChangesAction =
  (data: any) => (dispatch: AppDispatch) =>
    dispatch(eventsSlice.actions.changeAppointmentChanges(data));

export const changeEditingAppointmentAction =
  (data: any) => (dispatch: AppDispatch) =>
    dispatch(eventsSlice.actions.changeEditingAppointment(data));
