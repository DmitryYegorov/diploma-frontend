import { http } from "../index";

type GroupOptions = {
  specialtyId?: string;
  group?: number;
  course?: number;
  semesterId: string;
};

type CreateGroup = {
  group: number;
  subGroupsCount: number;
  specialityId: string;
  course: number;
};

export const getGroupsWithSubGroupsAndFaculties = async () =>
  http.get("/group/with-faculties");

export const fetchFacultiesList = async () => http.get("/faculty");

export const fetchSpecialitiesList = async () => http.get("/speciality");

export const fetchGroupsByOptions = async (options: GroupOptions) =>
  http.get("/group", { params: options });

export const addGroups = async (data: CreateGroup) => http.post("/group", data);

export const getSpecialitiesWithCourse = (semesterId: string) =>
  http.get(`/group/semester/${semesterId}`);
