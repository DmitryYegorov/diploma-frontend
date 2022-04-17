import moment from "moment";
import { EventType } from "../typings/enum";
export const mapDateToTime = (date: Date): string => {
  return moment(date).format("HH:mm");
};

export const types = [
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
