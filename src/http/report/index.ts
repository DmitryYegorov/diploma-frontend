import { http } from "../index";

export const createReport = async (data: any) => http.post("/report", data);

export const fetchReports = async () => http.get("/report");

export const fetchReportById = async (id: string) => http.get(`/report/${id}`);
