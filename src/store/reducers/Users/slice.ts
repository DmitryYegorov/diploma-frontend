import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/User";

interface SubjectState {
  error: string;
  list: Array<User>;
  selectedUser: User;
  total: number;
  isLoading: boolean;
}

const initialState: SubjectState = {
  list: [],
  total: 0,
  error: "",
  selectedUser: {
    id: "",
    isActive: false,
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersSuccess(state, action) {
      const { payload } = action;
      state.list = payload.list;
      state.total = payload.total;
      state.isLoading = false;
    },
    fetchUsersFailed(state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    fetchUsers(state) {
      state.isLoading = true;
    },

    fetchOneUserSuccess(state, action) {
      const { payload } = action;
      state.selectedUser = payload;
    },
    fetchOneUserFailed(state, action) {
      state.error = action.payload.message;
    },
    fetchOneUser(state) {
      state.isLoading = true;
    },

    sendIsActiveStatus(state) {
      state.isLoading = true;
    },
    sendIsActiveStatusFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    sendIsActiveStatusSuccess(state, action) {
      state.isLoading = false;
      state.selectedUser.isActive = action.payload.isActive;
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
