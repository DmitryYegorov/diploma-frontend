import { http } from "../index";

export const getGroupsWithSubGroupsAndFaculties = async () =>
  http.get("/groups");

export const fetchFacultiesList = async () => http.get("/faculty");
