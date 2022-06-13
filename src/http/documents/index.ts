import { http } from "../index";

export const uploadFiles = async (data) => http.post("/document/upload", data);

export const getFiles = async (options) =>
  http.get("/document", { params: options });

export const downloadFile = async (id: string) =>
  http.get(`/document/download/${id}`);
