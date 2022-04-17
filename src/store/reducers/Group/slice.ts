import { createSlice } from "@reduxjs/toolkit";
import { GroupWithFaculty } from "../../../models/Group";

interface GroupState {
  error: string;
  list: Array<GroupWithFaculty>;
  total: number;
  isLoading: boolean;
}

const initialState: GroupState = {
  list: [],
  total: 0,
  error: "",
  isLoading: false,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    fetchGroupsSuccess(state, action) {
      const { payload } = action;
      state.list = payload.list;
      state.total = payload.total;
      state.isLoading = false;
    },
    fetchGroupsFailed(state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    fetchGroups(state) {
      state.isLoading = true;
    },
  },
  extraReducers: {},
});

export default groupsSlice.reducer;
