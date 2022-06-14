export enum UserRole {
  USER = "USER",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

export enum EventType {
  CONSULTATION = "CONSULTATION",
  COURSE_WORK = "COURSE_WORK",
  EXAM = "EXAM",
  CREDIT = "CREDIT",
  POSTGRADUATE = "POSTGRADUATE",
  TESTING = "TESTING",
  PRACTICE = "PRACTICE",
  DIPLOMA_DESIGN = "DIPLOMA_DESIGN",
  STATE_EXAMINATION_BOARD = "STATE_EXAMINATION_BOARD",
}

export enum ClassType {
  LECTION = "LECTION",
  PRACTICE_CLASS = "PRACTICE_CLASS",
  LAB = "LAB",
}

export enum Week {
  FIRST = "FIRST",
  SECOND = "SECOND",
  WEEKLY = "WEEKLY",
}

export enum WeekDay {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export enum ScheduleClassUpdateType {
  SWAP = "SWAP",
  CANCEL = "CANCEL",
  RESCHEDULED = "RESCHEDULED",
}

export enum ReportState {
  DRAFT = "DRAFT",
  SENT = "SENT",
  APPROVED = "APPROVED",
  REQUEST_CHANGES = "REQUEST_CHANGES",
}

export type LoadType = EventType | ClassType;
