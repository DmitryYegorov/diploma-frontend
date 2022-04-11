import { createSlice } from "@reduxjs/toolkit";

interface EventState {
  error: string;
  list: Array<any>;
  total: number;
  isLoading: boolean;
}

const initialState: EventState = {
  list: [],
  total: 0,
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
  },
  extraReducers: {},
});

export default eventsSlice.reducer;
