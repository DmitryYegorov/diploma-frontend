import { createSlice } from "@reduxjs/toolkit";
import { Subject } from "../../../models/Subject";
import schedule from "../../../pages/LoadAccounting/Schedule";

interface ScheduleState {
  error: string;
  list: Array<any>;
  isLoading: boolean;
}

const initialState: ScheduleState = {
  list: [],
  error: "",
  isLoading: false,
};

export const scheduleClasses = createSlice({
  name: "scheduleClasses",
  initialState,
  reducers: {
    fetchScheduleClassesSuccess(state, action) {
      const { payload } = action;
      state.list = payload.list;
    },
    fetchScheduleClassesFailed(state, action) {
      state.error = action.payload.message;
    },
    fetchScheduleClasses(state) {
      state.isLoading = true;
    },
  },
  extraReducers: {},
});

export default scheduleClasses.reducer;
