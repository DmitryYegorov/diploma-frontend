import { createSlice } from "@reduxjs/toolkit";

interface ScheduleState {
  error: string;
  list: Array<any>;
  scheduleOfDepartment: any;
  isLoading: boolean;
}

const initialState: ScheduleState = {
  scheduleOfDepartment: [],
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
      state.isLoading = false;
    },
    fetchScheduleClassesFailed(state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    fetchScheduleClasses(state) {
      state.isLoading = true;
    },

    fetchScheduleClassesOfDepartmentSuccess(state, action) {
      const { payload } = action;
      state.scheduleOfDepartment = payload;
      state.isLoading = false;
    },
    fetchScheduleClassesOfDepartmentFailed(state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    fetchScheduleClassesOfDepartment(state) {
      state.isLoading = true;
    },
  },
  extraReducers: {},
});

export default scheduleClasses.reducer;
