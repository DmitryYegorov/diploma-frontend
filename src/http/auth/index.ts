import { http } from "../index";
import * as AuthTypes from "../../typings/auth";
import { AxiosResponse } from "axios";
import { FieldValues, UnpackNestedValue } from "react-hook-form";
import { Login } from "../../typings/auth/Request";

export const login = async (
  data: UnpackNestedValue<FieldValues>
): Promise<AxiosResponse<Login>> => {
  return http.post("/auth/login", data);
};
