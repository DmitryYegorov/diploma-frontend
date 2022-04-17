import { createSlice } from "@reduxjs/toolkit";

interface SemesterState {
  error: string;
  data: {
    id: string;
    startDate: Date;
    endDate: Date;
  };
  isLoading: boolean;
}

const initialState: SemesterState = {
  data: {
    id: "",
    startDate: new Date(),
    endDate: new Date(),
  },
  error: "",
  isLoading: false,
};

export const semesterSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {
    fetchCurrentSemester(state) {
      state.isLoading = true;
    },
    fetchCurrentSemesterSuccess(state, action) {
      state.isLoading = false;
      state.data.id = action.payload.id;
      state.data.startDate = action.payload.startDate;
      state.data.endDate = action.payload.endDate;
    },
    fetchCurrentSemesterFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
  extraReducers: {},
});

export default semesterSlice.reducer;
