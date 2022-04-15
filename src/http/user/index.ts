import { http } from "../index";

export const getUsersList = async () => http.get("/user");

export const getOneUserById = async (id: string) => http.get(`/user/${id}`);

export const changeIsActiveUserStatus = async (
  userId: string,
  isActive: boolean
) => http.put(`/user/activate/${userId}`, { isActive });
