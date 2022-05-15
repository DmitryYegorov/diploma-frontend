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
