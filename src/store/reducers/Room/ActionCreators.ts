import { AppDispatch } from "../../index";
import { getRoomList } from "../../../http/room";
import { roomSlice } from "./slice";

export const fetchRoomsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(roomSlice.actions.fetchRooms());
    const res = await getRoomList();
    dispatch(roomSlice.actions.fetchRoomsSuccess(res.data));
  } catch (e) {
    dispatch(roomSlice.actions.fetchRoomsFailed(e));
  }
};
