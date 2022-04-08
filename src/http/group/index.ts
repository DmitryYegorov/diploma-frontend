import { http } from "../index";

export const getGroupsWithSubGroupsAndFaculties = async () =>
  http.get("/groups/with-faculties");
