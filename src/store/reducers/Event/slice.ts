import { createSlice } from "@reduxjs/toolkit";

interface EventState {
  error: string;
  list: Array<any>;
  updateLogs: Array<any>;
  total: number;
  isLoading: boolean;
  selectedDate: Date;
}

const initialState: EventState = {
  list: [],
  total: 0,
  updateLogs: [],
  error: "",
  isLoading: false,
  selectedDate: new Date(),
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

    fetchUpdateLogsSuccess(state, action) {
      const { payload } = action;
      state.updateLogs = payload;
      state.isLoading = false;
    },

    getPeriod(state, action) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: {},
});

export const { getPeriod } = eventsSlice.actions;

export default eventsSlice.reducer;
