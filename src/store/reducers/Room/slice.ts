import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../../../models/Room";

interface RoomState {
  error: string;
  list: Array<Room>;
  total: number;
  isLoading: boolean;
}

const initialState: RoomState = {
  list: [],
  total: 0,
  error: "",
  isLoading: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    fetchRoomsSuccess(state, action) {
      const { payload } = action;
      state.list = payload.list;
      state.total = payload.total;
      state.isLoading = false;
    },
    fetchRoomsFailed(state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    fetchRooms(state) {
      state.isLoading = true;
    },
  },
  extraReducers: {},
});

export default roomSlice.reducer;
