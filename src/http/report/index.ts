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

export const getMappedMonthReport = async (reportId: string) =>
  http.get(`report/month/${reportId}/mapped`);

export const saveChangesCalculatedReport = async (
  reportId: string,
  data: any
) => http.put(`report/${reportId}`, data);

export const sendReport = async (reportId: string) =>
  http.put(`report/${reportId}/send`);

export const fetchSentReports = async (options = {}) =>
  http.get("report/sent", { params: options });

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

export const deleteReportById = async (id: string) =>
  http.delete(`/report/${id}`);

export const reloadDataToReport = async (reportId: string) =>
  http.get(`/report/${reportId}/new-load`);

export const createTotalReport = async (data) =>
  http.post("/report/total", data);

export const fetchAllTotalReportList = async () =>
  http.get("/report/total/list");

export const fetchTotalReportById = async (id) =>
  http.get(`/report/total/${id}`);

export const fetchReportNotes = async (reportId) =>
  http.get(`/report/${reportId}/note`);

export const updateReportNote = async (noteId: string, newNote: string) =>
  http.put(`/report/note/${noteId}`, { note: newNote });

export const removeReportNote = async (noteId: string) =>
  http.delete(`/report/note/${noteId}`);
