import { http } from "../index";
import { UserRole } from "../../typings/enum";

export const getUsersList = async () => http.get("/user");

export const getOneUserById = async (id: string) => http.get(`/user/${id}`);

export const changeIsActiveUserStatus = async (
  userId: string,
  isActive: boolean
) => http.put(`/user/activate/${userId}`, { isActive });

export const activateEmail = async (activationCode: string) =>
  http.put(`/user/activate/email/${activationCode}`);

export const changeUserRole = async (userId: string, role: UserRole) =>
  http.put(`/user/${userId}/role`, { role });
