import { http } from "../index";
import { ReportData } from "../../typings/load";

export const createReport = async (data: any) => http.post("/report", data);

export const fetchReports = async () => http.get("/report");

export const fetchReportById = async (id: string) => http.get(`/report/${id}`);

export const saveLoadDataToReport = async (data: {
  load: Array<ReportData>;
  reportId: string;
}) => http.post("/study-load/save", data);

export const saveOtherLoadDataToReport = async (data: any) =>
  http.post("/other-load", data);

export const fetchOtherLoadDataByUser = async (options) =>
  http.get(`/other-load/my`);

export const fetchOtherLoadToReport = async (reportId: string) =>
  http.get(`/report/other-load/${reportId}`);

export const loadScheduleClassesToReport = async (reportId: string) =>
  http.get(`report/${reportId}/study`);

export const calculateReportDataByReportId = async (reportId: string) =>
  http.post(`report/${reportId}/calculate`);

export const getCalculatedReportDataByReportId = async (reportId: string) =>
  http.get(`report/${reportId}/calculate`);

export const saveChangesCalculatedReport = async (
  reportId: string,
  data: any
) => http.put(`report/${reportId}`, data);

export const sendReport = async (reportId: string) =>
  http.put(`report/${reportId}/send`);

export const fetchSentReports = async () => http.get("report/sent");

export const approveReport = async (reportId: string) =>
  http.put(`report/${reportId}/approve`);

export const cancelReport = async (reportId: string, adminNote: string) =>
  http.put(`report/${reportId}/cancel`, { adminNote });
