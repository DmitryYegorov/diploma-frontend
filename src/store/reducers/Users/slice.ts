import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/User";

interface SubjectState {
  error: string;
  list: Array<User>;
  selectedUser: User | null;
  total: number;
  isLoading: boolean;
}

const initialState: SubjectState = {
  list: [],
  total: 0,
  error: "",
  selectedUser: null,
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
    },
    fetchUsersFailed(state, action) {
      state.error = action.payload.message;
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
  },
  extraReducers: {},
});

export default userSlice.reducer;
