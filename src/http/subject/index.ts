import { http } from "../index";

export const getSubjectsList = async () => {
  return http.get("/subject");
};

export const addNewSubject = async (data: any) => {
  return http.post("/subject", data);
};

// export const updateSubject = async (data: any) => {
//   return http.post("/subject", data);
// };
