import { http } from "../index";

export const fetchActiveTeachers = async () =>
  http.get("/load-plan/teacher/list");
