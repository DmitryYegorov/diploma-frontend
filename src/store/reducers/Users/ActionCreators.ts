import { AppDispatch } from "../../index";
import { getOneUserById, getUsersList } from "../../../http/user";
import { userSlice } from "./slice";

export const fetchUsersAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.fetchUsers());
    const res = await getUsersList();
    dispatch(userSlice.actions.fetchUsersSuccess(res.data));
  } catch (e) {
    dispatch(userSlice.actions.fetchUsersFailed(e));
  }
};

export const fetchOneUserAction =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.fetchOneUser());
      const res = await getOneUserById(id);
      dispatch(userSlice.actions.fetchOneUserSuccess(res.data));
    } catch (e) {
      dispatch(userSlice.actions.fetchOneUserFailed(e));
    }
  };
