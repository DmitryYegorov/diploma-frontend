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
    user: JSON.parse(localStorage.getItem("userData") || "null"),
    access: localStorage.getItem("access") || "",
    refresh: localStorage.getItem("refresh") || "",
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
    refreshTokenFetch(state) {
      state.isLoading = true;
    },
    refreshTokenSuccess(state, action) {
      state.data.access = action.payload.token;
    },
    refreshTokenFailed(state, action) {
      state.error = action.payload.message;
      state.data = { user: null, refresh: "", access: "" };
      state.isAuthenticated = false;
      localStorage.removeItem("userData");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: {},
});

export default authSlice.reducer;
