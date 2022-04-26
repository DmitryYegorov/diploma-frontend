import { http } from "../index";
import { AxiosResponse } from "axios";
import { SwapTeacher, UpdateScheduleClass } from "../../typings/schedule";
import moment from "moment";

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

export const getScheduleDepartmentBySemester = async (semesterId: string) =>
  http.get(`/schedule/department/${semesterId}`);

export const getScheduleClassesToCalendar = async () =>
  http.get(`/schedule/calendar/my`);

export const swapTeacher = async (data: SwapTeacher) =>
  http.post("/schedule/swap-teacher", data);

export const updateScheduleClass = async (data: UpdateScheduleClass) =>
  http.post("/schedule/update", data);

export const getUpdatesLogs = async (
  startDate: Date | string,
  endDate: Date | string
) => {
  return http.get(
    `schedule/updates-list?startDate=${moment(startDate).format(
      "yyyy-MM-DD"
    )}&endDate=${moment(endDate).format("yyyy-MM-DD")}`
  );
};
