import { createSlice } from "@reduxjs/toolkit";
import { Subject } from "../../../models/Subject";
import schedule from "../../../pages/LoadAccounting/Schedule";

interface SubjectState {
  error: string;
  list: Array<any>;
  total: number;
  isLoading: boolean;
}

const initialState: SubjectState = {
  list: [],
  total: 0,
  error: "",
  isLoading: false,
};

export const scheduleTime = createSlice({
  name: "scheduleTime",
  initialState,
  reducers: {
    fetchScheduleTimeSuccess(state, action) {
      const { payload } = action;
      state.list = payload.list;
      state.total = payload.total;
    },
    fetchScheduleTimeFailed(state, action) {
      state.error = action.payload.message;
    },
    fetchScheduleTime(state) {
      state.isLoading = true;
    },
  },
  extraReducers: {},
});

export default scheduleTime.reducer;
