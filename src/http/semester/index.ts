import { http } from "../index";

export const getCurrentSemester = async () =>
  http.get("/schedule/semester/current");
