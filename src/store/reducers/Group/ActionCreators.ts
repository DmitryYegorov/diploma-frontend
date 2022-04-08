import { AppDispatch } from "../../index";
import { getGroupsWithSubGroupsAndFaculties } from "../../../http/group";
import { groupsSlice } from "./slice";

export const fetchGroupsWithFacultiesAction =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(groupsSlice.actions.fetchGroups());
      const res = await getGroupsWithSubGroupsAndFaculties();
      dispatch(groupsSlice.actions.fetchGroupsSuccess(res.data));
    } catch (e) {
      dispatch(groupsSlice.actions.fetchGroupsFailed(e));
    }
  };
