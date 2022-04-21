import { ClassType } from "../../typings/enum";
import { pink, red, lightBlue, teal } from "@mui/material/colors";

export const AppointmentMarkColors: Record<string, string> = {
  [ClassType.LAB]: pink[500],
  [ClassType.LECTION]: teal[500],
  [ClassType.PRACTICE_CLASS]: lightBlue[500],
  SWAP: red[500],
};
