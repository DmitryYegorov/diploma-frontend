import { http } from "../index";
import * as AuthTypes from "../../typings/auth";
import { AxiosResponse } from "axios";

export const login = async (
  data: AuthTypes.Request.Login
): Promise<AxiosResponse<AuthTypes.Response.Login>> => {
  return http.post("/auth/login", data);
};
