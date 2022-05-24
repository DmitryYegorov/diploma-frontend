import { ClassType, EventType } from "../enum";

export const LoadTypeEnum = { ...ClassType, ...EventType };

export type ReportData = {
  id: string;
  subjectName?: string;
  type: ClassType | EventType;
  duration: number;
};

export type LoadItemType = {
  subjectName: string;
  studentsCount?: number;
  groupsCount?: number;
  facultyName?: string;
} & Record<ClassType | EventType, number>;
