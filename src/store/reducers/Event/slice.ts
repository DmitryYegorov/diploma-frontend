import { createSlice } from "@reduxjs/toolkit";

interface EventState {
  error: string;
  list: Array<any>;
  addedAppointment: any;
  appointmentChanges: any;
  editingAppointment: any | undefined;
  total: number;
  isLoading: boolean;
}

const initialState: EventState = {
  list: [],
  total: 0,
  addedAppointment: {},
  appointmentChanges: {},
  editingAppointment: {},
  error: "",
  isLoading: false,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    fetchEventsSuccess(state, action) {
      const { payload } = action;
      state.list = payload.list;
      state.total = payload.total;
      state.isLoading = false;
    },
    fetchEventsFailed(state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    fetchEvents(state) {
      state.isLoading = true;
    },

    changeAddedAppointment(state, action) {
      state.addedAppointment = action.payload.addedAppointment;
    },
    changeAppointmentChanges(state, action) {
      state.appointmentChanges = action.payload.appointmentChanges;
    },
    changeEditingAppointment(state, action) {
      state.editingAppointment = action.payload.editingAppointment;
    },
  },
  extraReducers: {},
});

export const {
  changeAddedAppointment,
  changeAppointmentChanges,
  changeEditingAppointment,
} = eventsSlice.actions;

export default eventsSlice.reducer;
