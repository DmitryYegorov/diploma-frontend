import { http } from "../index";

export const fetchActiveTeachers = async () =>
  http.get("/load-plan/teacher/list");

export const addLoadPlanItem = async (data) => http.post("/load-plan", data);

export const getLoadPlanByOptions = async (options) =>
  http.get("/load-plan/mapped", { params: options });

export const getLoadPlanListByOptions = async (options) =>
  http.get("/load-plan", { params: options });

export const deleteLoadPlanItemById = async (id: string) =>
  http.delete(`/load-plan/${id}`);

export const editLoadPlanItem = async (id: string, data) =>
  http.put(`/load-plan/${id}`, data);
