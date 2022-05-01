import { http } from "../index";

export const createReport = async (data: any) => http.post("/report", data);

export const fetchReports = async () => http.get("/report");
