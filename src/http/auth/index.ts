import { http } from "../index";
import * as AuthTypes from "../../typings/auth";
import { AxiosResponse } from "axios";
import { UnpackNestedValue } from "react-hook-form";

export const login = async (
  data: UnpackNestedValue<AuthTypes.Request.Login>
): Promise<AxiosResponse<AuthTypes.Response.Login>> =>
  http.post("/auth/login", data);

export const refresh = async (access: string) => {
  return http.post("/auth/refresh", { access });
};

export const register = async (data: any) => http.post("/auth/register", data);
