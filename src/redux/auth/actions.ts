import { createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../http/auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await login({ email, password });
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response.data || "Sign Up Error on server!"
      );
    }
  }
);
