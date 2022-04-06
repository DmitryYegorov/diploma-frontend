import { User } from "../../../typings/user";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  error: string;
  data: { user: User; access: string; refresh: string };
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  data: {
    user: {},
    access: "",
    refresh: "",
  },
  error: "",
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess(state, action) {
      state.isAuthenticated = true;
      state.data.user = action.payload.user;
      state.data.refresh = action.payload.refresh;
      state.data.access = action.payload.access;
    },
    authFailed(state, action) {
      state.error = action.payload.message;
    },
    authFetch(state) {
      state.isLoading = true;
    },
  },
  extraReducers: {},
});

export default authSlice.reducer;
