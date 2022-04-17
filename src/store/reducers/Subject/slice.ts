import { createSlice } from "@reduxjs/toolkit";
import { Subject } from "../../../models/Subject";

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

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    fetchSubjectsSuccess(state, action) {
      const { payload } = action;
      state.list = payload.list;
      state.total = payload.total;
    },
    fetchSubjectsFailed(state, action) {
      state.error = action.payload.message;
    },
    fetchSubjects(state) {
      state.isLoading = true;
    },
    createSubjectFetch(state) {
      state.isLoading = true;
    },
    createSubjectSuccess(state, action) {
      state.isLoading = false;
    },
    createSubjectFailed(state, action) {
      state.error = action.payload.message;
    },
  },
  extraReducers: {},
});

export default subjectSlice.reducer;
