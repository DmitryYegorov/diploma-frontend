import moment from "moment";
import {
  ClassType,
  EventType,
  ReportState,
  ScheduleClassUpdateType,
} from "../typings/enum";
import {
  deepOrange,
  cyan,
  blue,
  lightBlue,
  blueGrey,
  green,
} from "@mui/material/colors";
import { ModeEdit, Done, DoneAll } from "@mui/icons-material";

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
  [ReportState.SENT]: { color: deepOrange[700] },
  [ReportState.APPROVED]: { color: green[800] },
};
