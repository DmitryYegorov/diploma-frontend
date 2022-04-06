import { AppDispatch } from "../../index";
import * as AuthTypes from "../../../typings/auth";
import { login } from "../../../http/auth";
import { authSlice } from "./slice";

export const loginAction =
  (data: AuthTypes.Request.Login) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.authFetch());
      const res = await login(data);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      dispatch(authSlice.actions.authSuccess(res.data));
    } catch (e) {
      dispatch(authSlice.actions.authFailed(e));
    }
  };
