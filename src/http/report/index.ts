import { http } from "../index";
import { ReportData } from "../../typings/load";

export const createReport = async (data: any) => http.post("/report", data);

export const fetchReports = async () => http.get("/report");

export const fetchReportById = async (id: string) => http.get(`/report/${id}`);

export const saveLoadDataToReport = async (data: {
  load: Array<ReportData>;
  reportId: string;
}) => http.post("/study-load/save", data);

export const fetchOtherLoadToReport = async (reportId: string) =>
  http.get(`/report/other-load/${reportId}`);

export const loadDataToReport = async (reportId: string) =>
  http.get(`report/${reportId}/load`);

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

export const removeLoadItemFromReport = async (id: string) =>
  http.delete(`report/load/${id}`);

export const saveOtherLoadData = async (data: any) =>
  http.post("/other-load", data);

export const fetchOtherLoadDataByUser = async (options) =>
  http.get(`/other-load/my`, { params: options });

export const updateOtherLoadItem = async (id: string, data) =>
  http.put(`/other-load/${id}`, data);

export const deleteOtherLoadItemById = async (id: string) =>
  http.delete(`/other-load/${id}`);
