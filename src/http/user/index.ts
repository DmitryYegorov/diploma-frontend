import { http } from "../index";

export const getUsersList = async () => http.get("/user");

export const getOneUserById = async (id: string) => http.get(`/user/${id}`);
