import { createSlice } from "@reduxjs/toolkit";

interface ScheduleState {
  error: string;
  list: any;
  scheduleOfDepartment: any;
  isLoading: boolean;
  classItem: any;
}

const initialState: ScheduleState = {
  scheduleOfDepartment: [],
  list: null,
  error: "",
  isLoading: false,
  classItem: {},
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
      state.list = [];
    },
    fetchScheduleClasses(state) {
      state.isLoading = true;
      state.list = [];
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

    fetchOneClassById(state) {
      state.isLoading = true;
    },
    fetchOneClassByIdSuccess(state, action) {
      state.isLoading = false;
      state.classItem = action.payload;
    },
    fetchOneClassByIdFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
  extraReducers: {},
});

export default scheduleClasses.reducer;
