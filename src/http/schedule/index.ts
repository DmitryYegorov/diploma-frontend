import { http } from "../index";
import { AxiosResponse } from "axios";

export const getTimes = async () => http.get("/schedule/time");

export const setClassToSchedule = async (data: {
  subjectId: any;
  week: any;
  type: any;
  roomId: string | undefined;
  weekDay: number;
  scheduleTimeId: string;
  groupIds: any;
}) => http.post("/schedule", data);

export const getScheduleClassesForAuthenticatedTeacher = async (): Promise<
  AxiosResponse<Record<string, string | number | undefined>>
> => http.get("/schedule");
