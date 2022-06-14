import moment from "moment";
import {
  ClassType,
  EventType,
  ReportState,
  ScheduleClassUpdateType,
  UserRole,
} from "../typings/enum";
import {
  deepOrange,
  cyan,
  blue,
  lightBlue,
  blueGrey,
  green,
} from "@mui/material/colors";

export const mapDateToTime = (date: Date): string => {
  return moment(date).format("HH:mm");
};

export const eventTypes = [
  { value: EventType.CREDIT, label: "Зачёт" },
  { value: EventType.EXAM, label: "Экзамен" },
  { value: EventType.CONSULTATION, label: "Консультация" },
  { value: EventType.COURSE_WORK, label: "Курсовая работа" },
  { value: EventType.TESTING, label: "Тестирование" },
  { value: EventType.DIPLOMA_DESIGN, label: "Дипломное проектирование" },
  { value: EventType.POSTGRADUATE, label: "Магистранты" },
  { value: EventType.PRACTICE, label: "Практика" },
  { value: EventType.STATE_EXAMINATION_BOARD, label: "ГЭК" },
];

export const classTypes = [
  { value: ClassType.LAB, label: "Лаб. работа" },
  { value: ClassType.LECTION, label: "Лекция" },
  { value: ClassType.PRACTICE_CLASS, label: "Практ. занятие" },
];

export const AppointmentMarkColors: Record<string, string> = {
  [ClassType.LAB]: blue[500],
  [ClassType.LECTION]: lightBlue[800],
  [ClassType.PRACTICE_CLASS]: cyan[800],
  [ScheduleClassUpdateType.SWAP]: deepOrange[500],
};

export const ReportStateConfig: Record<ReportState, any> = {
  [ReportState.DRAFT]: { color: blueGrey[600] },
  [ReportState.SENT]: { color: cyan[700] },
  [ReportState.REQUEST_CHANGES]: { color: deepOrange[700] },
  [ReportState.APPROVED]: { color: green[800] },
};

export const loadTypeMap = Object.fromEntries([
  ...eventTypes.map((e) => [e.value, e.label]),
  ...classTypes.map((c) => [c.value, c.label]),
]);

export const reportTypeMap = {
  MONTH: "Месяц",
  SEMESTER: "Семестр",
  YEAR: "Учебный год",
  TOTAL: "Итоговый",
};

export const totalReportMap = {
  MONTH: "Месяц",
  SEMESTER: "Семестр",
  ACADEMIC_YEAR: "Учебный год",
};

export const userRoleMap = {
  [UserRole.USER]: "role:USER",
  [UserRole.ADMIN]: "role:ADMIN",
  [UserRole.MANAGER]: "role:MANAGER",
};
