import { http } from "../index";

export const getCurrentSemester = async () => http.get("/semester/current");

export const getSemesterById = async (semesterId: string) =>
  http.get(`/semester/${semesterId}`);

export const getList = async () => http.get("/semester");
