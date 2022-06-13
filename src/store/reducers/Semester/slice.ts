import { createSlice } from "@reduxjs/toolkit";

interface SemesterState {
  error: string;
  selectedSemester: {
    id: string;
    startDate: Date;
    endDate: Date;
  };
  list: Array<any>;
  academicYears: Array<any>;
  isLoading: boolean;
}

const initialState: SemesterState = {
  selectedSemester: {
    id: "",
    startDate: new Date(),
    endDate: new Date(),
  },
  list: [],
  academicYears: [],
  error: "",
  isLoading: false,
};

export const semesterSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {
    fetchSemester(state) {
      state.isLoading = true;
    },
    fetchSemesterSuccess(state, action) {
      state.isLoading = false;
      state.selectedSemester.id = action.payload.id;
      state.selectedSemester.startDate = action.payload.startDate;
      state.selectedSemester.endDate = action.payload.endDate;
    },
    fetchSemesterFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    fetchList(state) {
      state.isLoading = true;
    },
    fetchListSuccess(state, action) {
      state.isLoading = false;
      state.list = action.payload.list;
    },
    fetchListFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    fetchAcademicYears(state) {
      state.isLoading = true;
    },
    fetchAcademicYearsSuccess(state, action) {
      state.isLoading = false;
      state.academicYears = action.payload;
    },
    fetchAcademicYearsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
  extraReducers: {},
});

export default semesterSlice.reducer;
