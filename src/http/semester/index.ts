import { http } from "../index";

export const getCurrentSemester = async () => http.get("/semester/current");

export const getSemesterById = async (semesterId: string) =>
  http.get(`/semester/${semesterId}`);

export const getList = async () => http.get("/semester");

export const getAcademicYears = async () => http.get("/semester/academic-year");

export const createAcademicYear = async (data: any) =>
  http.post("/semester/academic-year", data);

export const getAcademicYear = async (id: string) =>
  http.get(`semester/academic-year/${id}`);
