import { ClassType, Week } from "../../typings/enum";
import { GroupWithFaculty } from "../Group";

export interface ScheduleClass {
  subject: string;
  week: Week;
  room: string;
  type: ClassType;
  groups: Array<GroupWithFaculty>;
}
