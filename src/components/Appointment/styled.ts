import { ClassType, ScheduleClassUpdateType } from "../../typings/enum";
import { indigo, deepOrange, green, teal } from "@mui/material/colors";

export const AppointmentMarkColors: Record<string, string> = {
  [ClassType.LAB]: indigo[300],
  [ClassType.LECTION]: teal[500],
  [ClassType.PRACTICE_CLASS]: green[600],
  [ScheduleClassUpdateType.SWAP]: deepOrange[500],
};
