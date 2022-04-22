import { ScheduleClassUpdateType } from "../enum";
import { SchedulerDateTime } from "@devexpress/dx-react-scheduler";

export type SwapTeacher = {
  teacherId: string;
  reason: string;
  scheduleClassId: string | number;
  classDate: Date | string;
};

export type UpdateScheduleClass = {
  reason: string;
  scheduleClassId: string | number;
  classDate: Date | string | SchedulerDateTime;
  rescheduleDate?: Date | string;
  type: ScheduleClassUpdateType;
};
